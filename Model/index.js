// ! This file is used for associations between models

const User = require("./userModel");
const Product = require("./productModel");
const Service = require("./serviceModel");
const ProductService = require("./product_serviceModel");

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

// Export models
module.exports = {
  User,

  Product,
  Service,
  ProductService,
};
