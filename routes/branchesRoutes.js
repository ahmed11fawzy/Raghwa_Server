const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchesController");
router.route("/").post(branchController.createBranch).get(branchController.getAllBranches);
router
  .route("/:id")
  .get(branchController.getBranchById)
  .patch(branchController.updateBranch)
  .delete(branchController.deleteBranch);

module.exports = router;
