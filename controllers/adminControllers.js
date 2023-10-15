const Car = require("../models/carModel");

// b
const carPage = async (req, res) => {
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
    res.render("pages/index.ejs", {
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

// const createCar = async (req, res) => {
//   try {
//     // Make sure to log the incoming request body to debug
//     console.log("Request Body:", req.body);

//     const { name, rent, size } = req.body;
//     await Car.create({ name, rent, size, picture });
//     req.flash("message", "Ditambah");
//     res.redirect("/dashboard");
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// };

const createCar = async (req, res) => {
  try {
    const { name, rent, size } = req.body;
    const picture = req.file ? req.file.filename : null; // Use req.file for file uploads

    await Car.create({ name, rent, size, picture });
    req.flash("message", "Ditambah");
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const createCarPage = async (req, res) => {
  try {
    res.render("pages/create.ejs");
  } catch (err) {
    res.status(400).json({
      status: "failed",
      requestTime: req.requestTime,
      message: err.message,
    });
  }
};

const editCarPage = async (req, res) => {
  try {
    console.log("ID:", req.params.id);
    const car = await Car.findById(req.params.id);
    res.render("pages/edit.ejs", {
      car,
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
    await Car.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    req.flash("message", "Diupdate");
    res.redirect("/dashboard");
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
    await Car.findByIdAndRemove(id);
    req.flash("message", "Dihapus");
    res.redirect("/dashboard");
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  carPage,
  createCar,
  createCarPage,
  editCarPage,
  editCar,
  deleteCar,
};
