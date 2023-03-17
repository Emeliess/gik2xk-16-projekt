module.exports = (sequelize, DataTypes) => {
  return sequelize.define("row", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: DataTypes.DOUBLE,
  });
};
