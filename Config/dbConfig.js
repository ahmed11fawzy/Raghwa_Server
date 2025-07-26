const sequelize = require("./sequelize");

const dotenv = require("dotenv");
const { Branch, User, Section, Company, Permission, Role, RolePermission } = require("../Model/index"); // Import Branch model

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to SQL Server via Sequelize");
    // Sync tables in the correct order
    await Company.sync({ force: false }); // Create Company table first
    await Branch.sync({ force: false }); // Create Branch table first
    await Section.sync({ force: false }); // Create Section table next
    await Permission.sync({ force: false }); // Create Permission table next
    await Role.sync({ force: false }); // Create Role table next
    await RolePermission.sync({ force: false }); // Create RolePermission table next
    await User.sync({ force: false }); // Create User table last
    await sequelize.sync({ force: false }); // Synchronize all models with the database
    // Synchronize models with the database and apply changes
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
