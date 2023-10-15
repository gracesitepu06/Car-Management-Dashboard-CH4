const express = require("express");
const adminController = require("../controllers/adminControllers");
const router = express.Router();

// api function for render page

router.route("/dashboard").get(adminController.carPage);

router.route("/dashboard/create").get(adminController.createCarPage);

router.route("/dashboard/edit/:id").get(adminController.editCarPage);

// api function for action

router.route("/pages/add").post(adminController.createCar);

router.route("/pages/delete/:id").post(adminController.deleteCar);

router.route("/pages/edit/:id").post(adminController.editCar);

module.exports = router;
