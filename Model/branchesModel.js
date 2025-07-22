const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");

const Branch = sequelize.define("branch", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // ! Branch information
  arabicName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  englishName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storageCapacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  working_hours_from: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  working_hours_to: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  // ! Contact information

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // ! Address information

  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // other fields

  manager: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  supervisor: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // ! Attachments

  branchImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  licenceAttachment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  anotherAttachments: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Companies", // اسم الجدول اللي راجع منه الـ FK
      key: "id",
    },
  },
});

module.exports = Branch;
