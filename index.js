const path = require("path");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const carRouter = require("./routes/carRouters");
const adminRouter = require("./routes/adminRoutes");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({
    message: "ping successfully",
  });
});

// Use routers
app.use("/api/v1/cars", carRouter);
app.use("/", adminRouter);

module.exports = app;
