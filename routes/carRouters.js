const express = require("express");
const carController = require("../controllers/carControllers");

const router = express.Router();

// router.param("id", carController.checkId);

router.route("/").get(carController.getAllCars).post(carController.createCar);

// router.route("/model").post(carController.createCar);

router
  .route("/:id")
  .get(carController.getCarById)
  .patch(carController.editCar)
  .delete(carController.deleteCar);

module.exports = router;
