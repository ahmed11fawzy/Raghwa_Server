const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { dynamicUpload } = require("../middlewares/fileUpload");

// حقول الملفات اللي هتترفع (attachments + symbol)
const companyFileFields = [
  "commercialRegistrationNumberAttachment",
  "taxRegistrationNumberAttachment",
  "licenceAttachment",
  "qualityCertificateAttachment",
  "logoAttachment",
  "buildingsAttachment",
  "anotherAttachments",
  "symbol",
];

const branchFileFields = ["icon"];

router
  .route("/")
  .post(dynamicUpload(companyFileFields), companyController.createCompany)
  .get(companyController.getAllCompanies);

router
  .route("/:id/branches")
  .get(companyController.getCompanyBranches)
  .post(dynamicUpload(branchFileFields), companyController.createBranch);

router
  .route("/:id")
  .get(companyController.getCompanyById)
  .patch(dynamicUpload(companyFileFields), companyController.updateCompany)
  .delete(companyController.deleteCompany);

module.exports = router;
