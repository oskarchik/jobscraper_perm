module.exports = (sequelize, type) => {
  const Token = sequelize.define(
    'Token',
    {
      t_id: {
        type: type.UUID,
        primaryKey: true,
        notNullable: true,
      },
      token: {
        type: type.STRING(500),
        notNullable: true,
        unique: true,
      },
      user_id: {
        type: type.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      underscored: true,
    }
  );

  return Token;
};
