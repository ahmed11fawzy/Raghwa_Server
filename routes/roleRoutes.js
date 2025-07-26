const { getAllRoles, createRole } = require("../controllers/roleController");

const Router = require("express").Router();

Router.route("/").get(getAllRoles).post(createRole);

module.exports = Router;
