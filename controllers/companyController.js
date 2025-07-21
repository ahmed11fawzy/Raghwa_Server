const { where } = require("sequelize");
const appError = require("../utils/appError");
const { Company, Branch } = require("../Model");
const { uploadFile } = require("../utils/fileUpload");
// Create a new company
exports.createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    if (!company) throw new appError("Company already exists", 400); // Check if company already exists
    res.status(201).json({
      status: "success",
      data: company,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json({
      status: "success",
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

// Get single company by ID
exports.getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      throw new appError("Company not found", 404);
    }
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// Update company
exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      throw new appError("Company not found", 404);
    }
    await company.update(req.body);

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      throw new appError("Company not found", 404);
    }

    await company.destroy();

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.createBranch = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const { name, address, phoneNumber, email, zone, isActive } = req.body;

    const icon = `/Uploads/${req.file.filename}`; // المسار النصي

    const company = await Company.findByPk(companyId);
    if (!company) throw new appError("Company not found", 404);

    console.log("req.body:", req.body);
    console.log("req.file:", req.file); // للتصحيح

    const branch = await Branch.create({
      companyId,
      name,
      icon, // حفظ المسار النصي
      address,
      phoneNumber,
      email,
      zone: zone || null,
      isActive: isActive === "true" || isActive === true,
    });

    res.status(201).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

exports.getCompanyBranches = async (req, res, next) => {
  try {
    const branches = await Branch.findAll({ where: { companyId: req.params.id } });
    res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    next(error);
  }
};

// Middleware لرفع الملف
exports.uploadBranchIcon = uploadFile("icon");
