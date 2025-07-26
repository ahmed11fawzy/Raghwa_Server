const { DataTypes } = require("sequelize");

const sequelize = require("../Config/sequelize");

const ProductStorage = sequelize.define("ProductStorage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Product",
      key: "id",
    },
    allowNull: false,
  },
  storageId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Storage",
      key: "id",
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  minStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductStorage;
