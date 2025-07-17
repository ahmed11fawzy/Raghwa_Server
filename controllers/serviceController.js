const { Service, Product, ProductService } = require("../Model");
const catchAsync = require("../utils/catchAsync");
const getAllServices = async (req, res, next) => {
  const services = await Service.findAll({
    include: [
      {
        model: Product,
        through: { attributes: [] },
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      services,
    },
  });
};

const createService = catchAsync(async (req, res, next) => {
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
