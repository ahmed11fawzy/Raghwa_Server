// ! This file is used for associations between models

const User = require("./userModel");

const UserRole = require("./user_roleModel");
const Role = require("./roleModel");
const RolePermission = require("./role_permissionModel");
const Permission = require("./permissionModel");
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
const Section = require("./sectionModel");

// TODO 1) Define associations between User ,section , Role , Permission ,branch

User.belongsTo(Branch, { foreignKey: "branchId" });
Branch.hasMany(User, { foreignKey: "branchId" });
User.belongsTo(Section, { foreignKey: "sectionId" });
Section.hasMany(User, { foreignKey: "sectionId" });

User.belongsToMany(Role, { through: UserRole, foreignKey: "userId" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId" });

UserRole.belongsTo(User, { foreignKey: "userId" });
UserRole.belongsTo(Role, { foreignKey: "roleId" });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId" });

RolePermission.belongsTo(Role, { foreignKey: "roleId" });
RolePermission.belongsTo(Permission, {
  foreignKey: "permissionId",
  onDelete: "RESTRICT", // Prevent deletion if associated
});
Permission.hasMany(RolePermission, {
  foreignKey: "permissionId",
  onDelete: "RESTRICT",
});

// TODO 2) relations between  Product , Service & ProductService

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

// TODO 3) relations  relations between Storage and Branch , Company

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
  Section,
  UserRole,
  Role,
  RolePermission,
  Permission,
  Company,
};
