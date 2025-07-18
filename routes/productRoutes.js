const Router = require("express").Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");

Router.route("/").get(getAllProducts).post(createProduct);
Router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = Router;
