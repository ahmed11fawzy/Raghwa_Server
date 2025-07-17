const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// Create a new company
router.post("/", companyController.createCompany);

// Get a single company by ID
router.get("/:id", companyController.getCompanyById);

// Update a company
router.patch("/:id", companyController.updateCompany);

// Delete a company
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
