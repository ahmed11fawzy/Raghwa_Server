// routes/storageRoutes.js
const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storageController");

router.route("/").get(storageController.getAllStorages);
router.route("/:id/products").post(storageController.addProductToStorage).get(storageController.getStorageProducts);
router
  .route("/:id")
  .get(storageController.getStorageById)
  .patch(storageController.updateStorage)
  .delete(storageController.deleteStorage);

module.exports = router;
