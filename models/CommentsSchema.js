module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define("comment", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return comment;
};
