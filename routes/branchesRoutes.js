const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchesController");

// Create a new branch
router.post("/", branchController.createBranch);

// Get all branches
router.get("/", branchController.getAllBranches);

// Get a single branch by ID
router.get("/:id", branchController.getBranchById);

// Update a branch
router.patch("/:id", branchController.updateBranch);

// Delete a branch
router.delete("/:id", branchController.deleteBranch);

module.exports = router;
