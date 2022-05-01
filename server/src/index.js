require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { remoteJobsCron } = require('./cronJob/index');
const apiRoutes = require('./routes/api.js');

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.FRONT_URL : 'http://localhost:3000';

const app = express();

require('./db');
app.use(cors({ credentials: true, origin: BASE_URL }));

remoteJobsCron();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app running on http://localhost:${process.env.PORT}`);
});
