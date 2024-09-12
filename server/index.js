const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/userRoute");

const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://learnmern2024:K4rz6vJFLEe5C0Xd@cluster0.gxna9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB connect"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server started");
});
