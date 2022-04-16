const Sequelize = require('sequelize');
const UserModel = require('./models/User');
const JobModel = require('./models/Job');
const TokenModel = require('./models/Token');

const { DB_NAME, DB_USER, DB_PASSWORD, HOST, DIALECT } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  logging: false,
  query: { raw: true },
});

const User = UserModel(sequelize, Sequelize);
const Job = JobModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);

//associations

Token.belongsTo(User);
User.hasMany(Token);

User.sync({ alter: true })
  .then(() => Token.sync({ force: true }))

  .catch((error) => console.log({ error }));

module.exports = {
  User,
  Job,
  Token,
};
