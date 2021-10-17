module.exports = (sequelize, type) => {
  return sequelize.define('Token', {
    id: {
      type: type.UUID,
      primaryKey: true,
      notNullable: true,
    },
    token: {
      type: type.STRING(500),
      notNullable: true,
      unique: true,
    },
  });
};
