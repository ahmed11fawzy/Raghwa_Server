const { Branch, Company } = require("../Model");
const AppError = require("../utils/appError");

// Create branch
exports.createBranch = async (req, res, next) => {
  try {
    if (!req.body.companyId) {
      throw new AppError("Company ID is required", 400);
    }
    const branch = await Branch.create(req.body);
    res.status(201).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

// Get all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll({
      include: { model: Company, as: "company" }, // Include company info
    });
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get branch by ID
exports.getBranchById = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id, {
      include: { model: Company, as: "company" },
    });
    if (!req.params.id) {
      throw new AppError("Branch ID is required", 400);
    }
    if (!branch) {
      throw new AppError("Branch not found", 400);
    }
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

// Update branch
exports.updateBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) {
      throw new AppError("Branch not found", 404);
    }
    await branch.update(req.body);
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

// Delete branch
exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }
    await branch.destroy();
    res.status(200).json({ success: true, message: "Branch deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
