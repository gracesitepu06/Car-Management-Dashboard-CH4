// const mongoose = require("mongoose");

const fs = require("fs");

const Car = require("../models/carModel");

const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        car: newCar,
      },
    });
    // res.redirect(200, "/dashboard");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// b
// const getAllCars = async (req, res) => {
//   try {
//     const cars = await Car.find();
//     res.status(200).json({
//       status: "success",
//       requestTime: req.requestTime,
//       length: cars.length,
//       data: {
//         cars,
//       },
//     });
//     // res.render("index.ejs", {
//     //   cars,
//     // });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       requestTime: req.requestTime,
//       message: err.message,
//     });
//   }
// };

const getAllCars = async (req, res) => {
  try {
    // cars filter
    const { name, size, rent } = req.query;
    const condition = {};

    if (name) {
      condition.name = {
        $regex: ".*" + name + ".*",
        // $options: "si",
      };
    }

    if (rent) {
      condition.rent = {
        $regex: {
          $gt: req.query.rent,
        },
        // $options: "si",
      };
    }

    if (size) {
      condition.size = {
        $regex: size,
        // $options: "si",
      };
    }

    const cars = await Car.find(condition);
    const fullUrl = req.originalUrl;
    res.render("index.ejs", {
      message: req.flash("message", ""),
      cars,
      fullUrl,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      requestTime: req.requestTime,
      message: err.message,
    });
  }
};

// const createCarPage = async (req, res) => {
//   try {
//     const cars = await Car.find();
//     res.render("create.ejs");
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       requestTime: req.requestTime,
//       message: err.message,
//     });
//   }
// };

// c
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// e
const editCar = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        car: car,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// f
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await Car.findByIdAndRemove(id);
    //validatornya
    if (!car) {
      return res.status(400).json({
        status: "failed",
        message: "data with this id is not define",
      });
    }

    res.status(201).json({
      status: "success",
      message: "data has been sucessfully deteled",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  editCar,
  deleteCar,
  createCar,
};
