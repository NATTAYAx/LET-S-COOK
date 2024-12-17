const express = require('express');
const path = require('path');
const app = express();

// Serve static files (like index.html and script.js)
app.use(express.static(path.join(__dirname)));

// Force correct MIME type for JavaScript
app.get('*.js', function(req, res, next) {
  res.setHeader('Content-Type', 'application/javascript');
  next();
});

// Serve index.html for root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});