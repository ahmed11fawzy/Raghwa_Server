const { Product, Service } = require("../Model");
const catchAsync = require("../utils/catchAsync");

const getAllProducts = async (req, res, next) => {
  const products = await Product.findAll({
    include: [
      {
        model: Service,
        through: { attributes: [] },
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

module.exports = {
  getAllProducts,
  createProduct,
};
