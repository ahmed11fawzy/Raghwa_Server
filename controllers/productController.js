const { Product, Service } = require("../Model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw new appError("product not found", 404);
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw new appError("product not found", 404);
    }
    const newProduct = await product.update(req.body);

    res.status(200).json({
      message: "updated successfully",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw new appError("product not found", 404);
    }
    await product.destroy();
    res.status(204).json({
      message: "deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
