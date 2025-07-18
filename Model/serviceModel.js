const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");

const Service = sequelize.define("Service", {
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
  serviceCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  targetCar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profitMarginPercent: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  finalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Service;
