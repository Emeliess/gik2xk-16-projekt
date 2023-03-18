module.exports = (sequelize, DataTypes) => {
  return sequelize.define("rating", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: DataTypes.DOUBLE,
  });
};
