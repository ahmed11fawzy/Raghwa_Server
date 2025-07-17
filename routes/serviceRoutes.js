const Router = require("express").Router();
const { getAllServices, createService } = require("../controllers/serviceController");

Router.route("/").get(getAllServices).post(createService);
// Router.route("/:id").get(getService).patch(updateService).delete(deleteService);

module.exports = Router;
