const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const branchController = require("../controllers/branchesController");

router.route("/").post(companyController.createCompany).get(companyController.getAllCompanies);
router.route("/:id/branches").get(companyController.getCompanyBranches).post(companyController.createBranch);
router
  .route("/:id")
  .get(companyController.getCompanyById)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);
module.exports = router;
