# Socket.IO Chat App

This is a simple chat application built using Socket.IO, Express, and SQLite. It allows multiple clients to connect to a server and exchange real-time messages.

## Prerequisites

- Node.js (v20 or higher) and npm installed on your machine.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anwar-Rizk/Real-Time-Chat.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Real-Time-Chat
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your web browser and visit `http://localhost:3000` to access the chat application.

## Usage

- Enter your name in the username input field.
- Type your message in the chat input field and press Enter to send it.
- All connected clients will receive the message in real-time.
- You can disconnect or connect by clicking the "Disconnect" or "Connect" buttons.
- You can open multiple browser tabs to simulate multiple clients.
- The chat history is stored in an SQLite database and is retrieved when a client connects.

## Code Explanation

The code sets up an Express server with Socket.IO integration and connects to an SQLite database to store chat messages.

- The `main` function is an asynchronous function that serves as the entry point of the application.
- The database connection is established using the `open` method from the `sqlite` package.
- The `messages` table is created (if it doesn't exist) with the required columns.
- The Express app is created and configured to serve static files from the `public` folder.
- The root route (`/`) is set up to serve the `index.html` file.
- Socket.IO's `Server` is instantiated and attached to the HTTP server.
- The `io.on('connection')` event listener handles new client connections.
- When a client sends a chat message, it is saved to the database and broadcasted to all connected clients.
- When a client connects, any missed messages since their last connection are retrieved from the database and sent to the client.
- The server listens on port 3000 and logs a message when it starts running.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.
