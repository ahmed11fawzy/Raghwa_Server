const sequelize = require("../Config/sequelize");
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  unitCostAtTime: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "Unit cost at the time of service creation",
  },
  totalCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "quantity * unitCostAtTime",
  },
});

module.exports = ProductService;
