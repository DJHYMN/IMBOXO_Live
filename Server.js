// server.js

const { WebSocketServer } = require('ws');

// Use the port provided by the environment, or 8080 as a fallback
const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

// This log will now show the correct port, whether local or on Render
console.log(`✅ Signaling server started on port ${PORT}`);

wss.on('connection', function connection(ws) {
  console.log("🔗 A new client connected!");

  ws.on('message', function message(data) {
    console.log('Received message => %s', data);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log("🔌 Client disconnected.");
  });
});
