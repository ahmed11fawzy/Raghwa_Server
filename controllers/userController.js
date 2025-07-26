const User = require("../Model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { deleteOne, updateOne, getOne, getAll } = require("./factoryHandler");

const { Branch, Section, Role, UserRole } = require("../Model");
const { where } = require("sequelize");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const users = await User.findAndCountAll({
    include: [
      { model: Branch, attributes: ["name"] },
      { model: Section, attributes: ["sectionName"] },
      { model: Role, attributes: ["roleName"] },
    ],
    attributes: { exclude: ["password", "branchId", "sectionId"] }, // Exclude password field
    offset,
    limit,
  });

  res.status(200).json({
    status: "succeed",
    data: users.rows,
    totalCount: users.count,
    totalPages: Math.ceil(users.count / limit),
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.par;
});

// ! not working yet

exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);

exports.updateMyData = catchAsync(async (req, res, next) => {
  // TODO 1) check if user want change password

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('if you want to change password go to "/updatepassword" ', 400));

    return next(new AppError('if you want to change password go to "/updatepassword" ', 400));
  }

  // TODO 2) check if user want to change it's role  which isn't his responsability

  if (req.body.role) {
    return next(new AppError("you don't have permession to change your role ", 403));
  }

  // TODO 3) update user data

  const { _id } = req.user;
  const { name, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true }).select(
    "-password"
  );

  if (!updatedUser) {
    return next(new AppError("user doesn't exist or input data is invalid ", 404));
  }

  res.status(200).json({
    status: "succeed",
    updatedUser,
  });
});

exports.deActivateUser = catchAsync(async (req, res, next) => {
  // TODO 1) get user id from
  const { _id } = req.user;

  const deActivatedUser = await User.findByIdAndUpdate(
    _id,
    { active: false },
    { new: true, runValidators: true }
  ).select("-password");

  if (!deActivatedUser) {
    return next(new AppError("user doesn't exist or input data is invalid ", 404));
  }
  res.status(204).json({
    status: "succeed",
    data: null,
  });
});

exports.CreateUser = catchAsync(async (req, res, next) => {
  const {
    arabicName,
    englinshName,
    ssNumber,
    email,
    password,
    phoneNumber,
    telephoneNumber,
    country,
    city,
    nighborhood,
    street,
    postalCode,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelation,
    role,
    branch,
    section,
    salary,
    active,
    startDate,
    profilePicture,
    idCardPicture,
    resume,
    certificates,
    contract,
    anotherAttachments,
  } = req.body;

  // TODO 1) Get branch ,section ids

  const branchId = await Branch.findOne({
    name: branch,
  });
  console.log("🚀 ~ branchId:", branchId);

  if (!branchId) {
    return next(new AppError("Branch not found", 404));
  }

  // TODO 2) check if section is exist in this branch
  const sectionId = await Section.findOne({
    name: section,
  });
  console.log("🚀 ~ sectionId:", sectionId);
  if (!sectionId) {
    return next(new AppError("Section not found", 404));
  }

  // TODO 3) Role check and assigning role with user to user role tabel
  const roleData = await Role.findOne({
    where: { roleName: role },
  });
  console.log("🚀 ~ roleData:", roleData);

  if (!roleData) {
    return next(new AppError("Role not found", 404));
  }

  //  TODO 4) Create user
  const newUser = await User.create({
    arabicName,
    englinshName,
    ssNumber,
    email,
    password,
    phoneNumber,
    telephoneNumber,
    country,
    city,
    nighborhood,
    street,
    postalCode,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelation,
    branchId: branchId.id,
    sectionId: sectionId.id,
    salary,
    active,
    startDate,
    profilePicture,
    idCardPicture,
    resume,
    certificates,
    contract,
    anotherAttachments,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }
  // TODO 5) Assigning role to user

  const userRole = await UserRole.create({
    userId: newUser.id,
    roleId: roleData.id,
  });
  console.log("🚀 ~ userRole:", userRole);
  res.status(201).json({
    status: "succeed",
    message: "User created successfully",
  });
});
