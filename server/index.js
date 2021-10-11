const express = require('express');

const app = express();

const PORT = 5000;

app.use('/', (req, res) => {
  res.send('holaaaaa');
});

app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});
