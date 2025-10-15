// server.js

const { WebSocketServer } = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

console.log("✅ Signaling server started on ws://localhost:8080");

// This function will run every time a new client connects
wss.on('connection', function connection(ws) {
  console.log("🔗 A new client connected!");

  // This function runs when a message is received from a client
  ws.on('message', function message(data) {
    console.log('Received message => %s', data);

    // This is the key part: Broadcast the message to all other clients.
    // The server is the "middleman".
    wss.clients.forEach(function each(client) {
      // Send to everyone except the original sender
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log("🔌 Client disconnected.");
  });
});
