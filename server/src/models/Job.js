module.exports = (sequelize, type) => {
  return sequelize.define(
    'Job',
    {
      id: {
        type: type.UUID,
        primaryKey: true,
        notNullable: true,
      },
      title: type.STRING,
      company: type.STRING,
      technologies: type.ARRAY(type.STRING),
      job_link: {
        type: type.STRING,
        notNullable: true,
        unique: true,
      },
      date: type.STRING,
      applied: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );
};
