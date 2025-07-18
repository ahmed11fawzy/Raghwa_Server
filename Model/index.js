// ! This file is used for associations between models

const User = require("./userModel");
const Product = require("./productModel");
const Service = require("./serviceModel");
const ProductService = require("./product_serviceModel");
const Branch = require("./branchesModel");
const Storage = require("./storageModel");
const ProductStorage = require("./product_storageModel");
const Company = require("./companyModel");

// TODO 1) relations between  Product , Service & ProductService

// Define N:M relationships
Service.belongsToMany(Product, {
  through: ProductService,
  foreignKey: "serviceId",
  otherKey: "productId",
});
Product.belongsToMany(Service, {
  through: ProductService,
  foreignKey: "productId",
  otherKey: "serviceId",
});

// Make sure to apply associations to the junction table as well
ProductService.belongsTo(Service, { foreignKey: "serviceId" });
ProductService.belongsTo(Product, { foreignKey: "productId" });

Service.hasMany(ProductService, { foreignKey: "serviceId" });
Product.hasMany(ProductService, { foreignKey: "productId" });

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

Company.hasMany(Branch, { foreignKey: "companyId" });
Branch.belongsTo(Company, { foreignKey: "companyId" });

Product.belongsToMany(Storage, {
  through: ProductStorage,
  foreignKey: "productId",
  otherKey: "storageId",
});

Storage.belongsToMany(Product, {
  through: ProductStorage,
  foreignKey: "storageId",
  otherKey: "productId",
});

// Export models
module.exports = {
  User,

  Product,
  Service,
  ProductService,
};
