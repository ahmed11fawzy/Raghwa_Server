// routes/storageRoutes.js
const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storageController");

router.route("/").post(storageController.createStorage).get(storageController.getAllStorages);
router.route("/:id/products").post(storageController.addProductToStorage);
router
  .route("/:id")
  .get(storageController.getStorageById)
  .patch(storageController.updateStorage)
  .delete(storageController.deleteStorage);

module.exports = router;
