const { Op } = require("sequelize");
const sequelize = require("../Config/sequelize");
const { Role, RolePermission, Permission } = require("../Model");
const catchAsync = require("../utils/catchAsync");
const { createOne, getOne, getAll, updateOne, deleteOne } = require("./factoryHandler");
const appError = require("../utils/appError");

exports.getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.findAll({
    include: [
      {
        model: Permission,
        attributes: ["permissionName", "description"], // Include only specific attributes from Permission
        through: { attributes: [] }, // Exclude the join table attributes
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: roles,
  });
});

exports.createRole = catchAsync(async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { roleName, description, Permissions } = req.body;

  // TODO 1. get all permissions name from Permissions array of objects
  const PermissionsNames = [...new Set(Permissions.flatMap((permission) => Object.keys(permission)))];
  console.log("🚀 ~ PermissionsNames:", PermissionsNames);

  // TODO 2. validate if all permissions exist in Permissions Model

  const existingPermissions = await Permission.findAll({
    where: { permissionName: { [Op.in]: PermissionsNames } },
    transaction,
  });
  if (existingPermissions.length !== PermissionsNames.length) {
    await transaction.rollback();
    return next(new appError("Some permissions not found", 404));
  }

  console.log("🚀 ~ existingPermissions:", existingPermissions);

  // TODO 3. create role

  const newRole = await Role.create({ roleName, description });

  // TODO 4. create role_permissions entries

  const rolePermissions = existingPermissions.map((permission) => ({
    roleId: newRole.id,
    permissionId: permission.dataValues.id,
  }));

  console.log("🚀 ~ rolePermissions:", rolePermissions);

  // TODO 5. bulk create role_permissions
  await RolePermission.bulkCreate(rolePermissions, { transaction });

  await transaction.commit();

  res.status(201).json({
    status: "success",
    data: {
      role: newRole,
    },
  });
});
