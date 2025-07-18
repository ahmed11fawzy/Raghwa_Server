const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchesController");
const storageController = require("../controllers/storageController");

router.route("/").get(branchController.getAllBranches);
router.route("/:id/storages").post(branchController.createStorage).get(branchController.getBranchStorages);
router
  .route("/:id")
  .get(branchController.getBranchById)
  .patch(branchController.updateBranch)
  .delete(branchController.deleteBranch);

module.exports = router;
