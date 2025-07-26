const { getAllUsers, CreateUser } = require("../controllers/userController");

const Router = require("express").Router();

Router.route("/").get(getAllUsers).post(CreateUser);

module.exports = Router;
