const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function main() {
  // Open the database file
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database,
  });

  // Create the 'messages' table (ignore the 'client_offset' column for now)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `);

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {},
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', async (socket) => {
    socket.on('chat message', async (msg) => {
      try {
        // Save the message to the database
        const result = await db.run(
          'INSERT INTO messages (content) VALUES (?)',
          msg
        );
        // Send the message to all clients
        io.emit('chat message', msg, result.lastID);
      } catch (e) {
        console.error(e);
      }
    });

    if (!socket.recovered) {
      try {
        // Get all messages that have been sent since the client was last connected
        const messages = await db.all(
          'SELECT id, content FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0]
        );
        // Send the messages to the client
        messages.forEach((row) => {
          socket.emit('chat message', row.content, row.id);
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
