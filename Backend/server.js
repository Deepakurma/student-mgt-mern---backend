import mongoose from "mongoose";
//deployment
process.env.NODE_ENV = "development";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((err) => {
    console.error("connetion failed: " + err);
  });
console.log(process.env.NODE_ENV);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
