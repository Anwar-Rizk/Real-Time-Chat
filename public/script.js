// Connect to server
const socket = io({
  auth: {
    serverOffset: 0
  }
})

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')
const toggleButton = document.getElementById('toggle-btn')
const clientName = document.getElementById('name')

// Toggle connection
toggleButton.addEventListener('click', (e) => {
  e.preventDefault()
  if (socket.connected) {
    toggleButton.innerText = 'Connect'
    socket.disconnect()
    toggleButton.style.backgroundColor = 'green'
  } else {
    toggleButton.innerText = 'Disconnect'
    socket.connect()
    toggleButton.style.backgroundColor = 'darkred'
  }
})

// Send message to server
form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value.trim()) {
    const nameVal = clientName.value ? clientName.value : 'Anonymous'
    socket.emit('chat message', nameVal + ': ' + input.value)
    input.value = ''
  }
})
// Receive message from server and display
socket.on('chat message', (msg, serverOffset) => {
  const item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
  socket.auth.serverOffset = serverOffset // Update server offset
})
//----------------------------------------------------------------------------
// Focus on name input when page loads
window.onload = function () {
  clientName.focus()
}
