const User = require("../Model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { deleteOne, updateOne, getOne, getAll } = require("./factoryHandler");
const { Branch, Section } = require("../Model");

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);

exports.updateMyData = catchAsync(async (req, res, next) => {
  // TODO 1) check if user want change password

  if (req.body.password || req.body.passwordConfirm) {
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
  /*  const {
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
  } = req.body; */

  // TODO 1) Get branch ,section ids

  const branchId = await Branch.findOne({
    name: req.body.branch,
  });
  console.log("🚀 ~ branchId:", branchId);

  if (!branchId) {
    return next(new AppError("Branch not found", 404));
  }

  const sectionId = await Section.findOne({
    name: req.body.section,
  });
  console.log("🚀 ~ sectionId:", sectionId);
  if (!sectionId) {
    return next(new AppError("Section not found", 404));
  }

  // const newUser = await User.create(req.body);

  res.status(201).json({
    status: "succeed",
  });
});
