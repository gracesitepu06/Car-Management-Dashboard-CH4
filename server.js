const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const app = require("./index");

const port = process.env.PORT || 3000;

const database = process.env.DATABASE_URI;

console.log(process.env);

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log("Database Successfully Connected"))
  .catch((err) => err);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
