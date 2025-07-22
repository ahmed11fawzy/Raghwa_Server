const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchesController");
const storageController = require("../controllers/storageController");
const { dynamicUpload } = require("../middlewares/fileUpload");

const branchFileFields = ["branchImage", "licenceAttachment", "anotherAttachments"];

router.route("/").get(branchController.getAllBranches);
router
  .route("/:id/storages")
  .post(dynamicUpload(branchFileFields), branchController.createStorage)
  .get(branchController.getBranchStorages);
router
  .route("/:id")
  .get(branchController.getBranchById)
  .patch(dynamicUpload(branchFileFields), branchController.updateBranch)
  .delete(branchController.deleteBranch);

module.exports = router;
