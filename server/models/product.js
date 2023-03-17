module.exports = (sequelize, DataTypes) => {
  return sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
  });
};
