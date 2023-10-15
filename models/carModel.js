const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car's name is required"],
      unique: true,
    },
    rent: {
      type: Number,
      required: [true, "Car's rent is required"],
      // default: 0,
    },
    size: {
      type: String,
      // enum: ["Small", "Medium", "Large"],
      required: [true, "Car's size is required"],
    },
    picture: {
      type: String,
      // contentType: String,
      // required: [true, "Car's photo is required"],
    },
  },
  {
    timestamps: {
      updatedAt: "updated_at",
    },
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
