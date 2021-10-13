require('dotenv').config();
const express = require('express');
const db = require('./database');

const app = express();
// TEST DB
db.select('*')
  .from('users')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

app.use('/', (req, res) => {
  res.send('holaaaaa');
});

app.listen(process.env.PORT, () => {
  console.log(`app running on http://localhost:${process.env.PORT}`);
});
