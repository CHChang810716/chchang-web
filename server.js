'use strict';

const express = require('express');
console.log(process.argv)
// Constants
const PORT = process.argv[2];
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);