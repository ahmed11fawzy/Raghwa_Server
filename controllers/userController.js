const User = require("../Model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { deleteOne, updateOne, getOne, getAll } = require("./factoryHandler");
const { Branch, Section, Role, UserRole } = require("../Model");
const { where } = require("sequelize");
const { uploadFilesLocally } = require("../middlewares/fileUpload");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const users = await User.findAndCountAll({
    include: [
      { model: Branch, attributes: [] },
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
  const { role } = req.body;
  // TODO 3) Role check and assigning role with user to user role tabel
  const roleData = await Role.findOne({
    where: { roleName: role },
  });

  if (!roleData) {
    return next(new AppError("Role not found", 404));
  }

  // Handle uploaded files
  const userFileFields = [
    "profilePicture",
    "idCardPicture",
    "resume",
    "certificates",
    "contract",
    "anotherAttachments",
  ];
  const uploadedFiles = await uploadFilesLocally(req.files, userFileFields);
  console.log(req.body);
  // Prepare user data
  const userData = { ...req.body };
  uploadedFiles.forEach((file) => {
    userData[file.fieldName] = file.link;
  });

  //  TODO 4) Create user
  const newUser = await User.create({
    ...userData,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }
  // TODO 5) Assigning role to user

  const userRole = await UserRole.create({
    userId: newUser.id,
    roleId: roleData.id,
  });
  res.status(201).json({
    status: "succeed",
    message: "User created successfully",
  });
});
