const { Company } = require("../Model");
const appError = require("../utils/appError");

// Create a new company
exports.createCompany = async (req, res, next) => {
  try {
    if (req.body.email) {
      const existingCompany = await Company.findOne({ where: { email: req.body.email } });
      if (existingCompany) {
        throw new appError("Company with this email already exists", 400);
      }
    }
    const company = await Company.create(req.body);
    if (!company) {
      throw new appError("Failed to create company", 400);
    }
    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (err) {
    next(err);
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
