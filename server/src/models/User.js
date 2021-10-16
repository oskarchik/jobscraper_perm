module.exports = (sequelize, type) => {
  return sequelize.define(
    'User',
    {
      id: {
        type: type.UUID,
        primaryKey: true,
        notNullable: true,
      },
      name: type.STRING,
      email: {
        type: type.STRING,
        notNullable: true,
        unique: true,
      },
      password: {
        type: type.STRING,
        notNullable: true,
      },
    },
    {
      underscored: true,
    }
  );
};
