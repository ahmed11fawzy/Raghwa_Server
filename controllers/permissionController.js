const { createOne, getAll } = require("../controllers/factoryHandler");
const { Permission } = require("../Model");
const catchAsync = require("../utils/catchAsync");

exports.createPermission = catchAsync(async (req, res, next) => {
  const { permissionName, description } = req.body;
  if (!permissionName) {
    return next(new Error("Permission name is required"));
  }

  const newPermission = await Permission.create({
    permissionName,
    description,
  });

  res.status(201).json({
    status: "success",
    data: newPermission,
    message: "Permission created successfully",
  });
});

exports.getAllPermissions = catchAsync(async (req, res, next) => {
  const permission = await Permission.findAll({});

  res.status(201).json({
    status: "success",
    data: permission,
  });
});

exports.updatePermission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { permissionName, description } = req.body;

  const permission = await Permission.findByPk(id);
  if (!permission) {
    throw new Error("Permission not found");
  }

  // Update multiple fields
  permission.set({
    permissionName,
    description,
  });

  await permission.save();
  res.status(200).json({
    status: "success",
    data: permission,
  });
});

exports.deletePermission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const permission = await Permission.findByPk(id);
  if (!permission) {
    return next(new Error("Permission not found"));
  }
  await permission.destroy();
  res.status(204).json({
    status: "success",
    message: "Permission deleted successfully",
  });
});
