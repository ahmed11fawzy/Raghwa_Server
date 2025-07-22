// ! This file is used for associations between models

const User = require("./userModel");
const Product = require("./productModel");
const Service = require("./serviceModel");
const ProductService = require("./product_serviceModel");
const Branch = require("./branchesModel");
const Storage = require("./storageModel");
const ProductStorage = require("./product_storageModel");
const Company = require("./companyModel");
const CompositeProduct = require("./composite_products");
const CompositeProductItem = require("./composite_product_itemsModel");

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

Company.hasMany(Branch, { foreignKey: "companyId", as: "branches" });
Branch.belongsTo(Company, { foreignKey: "companyId", as: "company" });

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

// العلاقات داخل جدول ProductStorage
ProductStorage.belongsTo(Product, { foreignKey: "productId" });
ProductStorage.belongsTo(Storage, { foreignKey: "storageId" });

// ولو هتحتاج ترجع العكس:
Product.hasMany(ProductStorage, { foreignKey: "productId" });
Storage.hasMany(ProductStorage, { foreignKey: "storageId" });

// العلاقة Many-to-Many بين المنتج المركب والمنتجات العادية
CompositeProduct.belongsToMany(Product, {
  through: CompositeProductItem,
  foreignKey: "compositeProductId",
  otherKey: "productId",
});

Product.belongsToMany(CompositeProduct, {
  through: CompositeProductItem,
  foreignKey: "productId",
  otherKey: "compositeProductId",
});

// علاقات مباشرة للجدول الوسيط
CompositeProductItem.belongsTo(Product, { foreignKey: "productId" });
CompositeProductItem.belongsTo(CompositeProduct, { foreignKey: "compositeProductId" });

Product.hasMany(CompositeProductItem, { foreignKey: "productId" });
CompositeProduct.hasMany(CompositeProductItem, { foreignKey: "compositeProductId" });

// Export models
module.exports = {
  User,
  Storage,
  Branch,
  ProductStorage,
  Product,
  Service,
  ProductService,
  Company,
  CompositeProduct,
  CompositeProductItem,
};
