const { DataTypes } = require("sequelize");
const sequelize = require("../Config/sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    arabicName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    englinshName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ssNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telephoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // ! User Address DATA
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nighborhood: {
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
    // ! Emergency contact DATA

    emergencyContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emergencyContactRelation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // ! position DATA
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Branches",
        key: "id",
      },
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Sections",
        key: "id",
      },
    },

    // ! User Activatoin , Salaries and other DATA

    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // ! User Attachments DATA
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idCardPicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    certificates: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contract: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    anotherAttachments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Enable createdAt and updatedAt
    hooks: {
      // Hash password before creating a new user
      beforeCreate: async (user) => {
        if (user.password) {
          const saltRounds = 10; // Number of salt rounds for bcrypt
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      // Hash password before updating (if password is changed)
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
    },
  }
);

module.exports = User;
