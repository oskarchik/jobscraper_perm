require('dotenv').config();
const express = require('express');

const { remoteJobsCron } = require('./cronJob/index');
const apiRoutes = require('./routes/api.js');

const app = express();

require('./db');

remoteJobsCron();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app running on http://localhost:${process.env.PORT}`);
});
