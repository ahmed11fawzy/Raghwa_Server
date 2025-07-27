const { DataTypes } = require("sequelize");
const sequelize = require("../Config/sequelize");

const RolePermission = sequelize.define(
  "RolePermission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Role",
        key: "id",
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Permission",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
module.exports = RolePermission;
