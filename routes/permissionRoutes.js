const Router = require("express").Router();
const { createPermission, getAllPermissions } = require("../controllers/permissionController");

Router.route("/").get(getAllPermissions).post(createPermission);

module.exports = Router;
