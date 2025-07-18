const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        fields: ["isActive"],
      },
      {
        fields: ["name"],
      },
    ],
  }
);

module.exports = Product;
