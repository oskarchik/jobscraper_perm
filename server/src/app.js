const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const apiRoutes = require('./routes/api.js');

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.FRONT_URL : 'http://localhost:3000';

const app = express();

app.use(cors({ credentials: true, origin: BASE_URL }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

module.exports = { app };
