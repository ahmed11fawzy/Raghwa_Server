const { Service, Product, ProductService } = require("../Model");
const catchAsync = require("../utils/catchAsync");
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({
      status: "success",
      data: {
        services,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createService = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    serviceCode,
    type,
    isActive,
    targetCar,
    Image,
    duration,
    quantity,
    servicePrice,
    productName,
  } = req.body;

  const service = await Service.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      service,
    },
  });
});

module.exports = {
  getAllServices,
  createService,
};
