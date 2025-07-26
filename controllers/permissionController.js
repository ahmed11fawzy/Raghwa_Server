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

exports.getAllPermissions = getAll("Permission");
