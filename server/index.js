// index.js
const express = require('express');
const path = require('path');
const router = require('./router');

const { PORT } = process.env;

const app = express();

// serve up production assets
app.use(express.static('client/build'));
// serve up the index.html if express does'nt recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Apply JSON parsing middleware
app.use(express.json());
// Apply router
app.use('/', router);
// Serving app on defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
