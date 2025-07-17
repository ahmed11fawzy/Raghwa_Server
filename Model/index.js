const User = require("./userModel");
const Company = require("./companyModel");
const Branch = require("./branchesModel");
const Storage = require("./storageModel");
// Define relationships
//relations between Branch and Company
Company.hasMany(Branch, {
  foreignKey: "companyId",
  as: "branches",
  onDelete: "RESTRICT",
});
Branch.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
  onDelete: "RESTRICT",
});

//relations between Storage and Branch
Branch.hasMany(Storage, {
  foreignKey: "branchId",
  as: "storages",
  onDelete: "RESTRICT",
});
Storage.belongsTo(Branch, {
  foreignKey: "branchId",
  as: "branch",
  onDelete: "RESTRICT",
});

// Export models
module.exports = {
  User,
  Company,
  Branch,
  Storage,
};
