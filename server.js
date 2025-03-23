require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


//  Routes for each CRUD

//test student
const studentRoutes = require("./routes/student");
app.use("/students", studentRoutes);

//Sanduni

//Lakshitha

//Jithma

//Primal
const patientRoutes = require("./routes/patient");
app.use("/patients", patientRoutes);



// Default Route
app.get("/", (req, res) => {
  res.send(`We are connected! Running on port ${process.env.PORT}`);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
