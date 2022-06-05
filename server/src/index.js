require('dotenv').config();
const { app } = require('./app');
const { remoteJobsCron } = require('./services/cronJob/index');

require('./db');

remoteJobsCron();

app.listen(process.env.PORT, () => {
  console.log(`app running on http://localhost:${process.env.PORT}`);
});
