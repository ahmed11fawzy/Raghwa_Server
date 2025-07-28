const { getAllUsers, CreateUser } = require("../controllers/userController");
const { dynamicUpload } = require("../middlewares/fileUpload");

const Router = require("express").Router();

const userFileFields = ["profilePicture", "idCardPicture", "resume", "certificates", "contract", "anotherAttachments"];

Router.route("/").get(getAllUsers).post(dynamicUpload(userFileFields), CreateUser);

module.exports = Router;
