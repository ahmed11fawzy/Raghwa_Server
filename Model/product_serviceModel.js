const { sequelize } = require("../Config/dbConfig");
const { DataTypes } = require("sequelize");

const ProductService = sequelize.define("ProductService", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Product",
      key: "id",
    },
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Service",
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  servicePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = ProductService;
