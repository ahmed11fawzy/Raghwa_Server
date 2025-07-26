// models/composite_product_itemsModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../Config/sequelize");

const CompositeProductItem = sequelize.define("CompositeProductItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  compositeProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = CompositeProductItem;
