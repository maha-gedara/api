require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


//  Routes for each CRUD




//Sanduni inventory
const inventoryRouter = require("./routes/inventory.js");
app.use("/inventory", inventoryRouter);

//Sanduni billing
const billingRouter = require("./routes/billing.js");
app.use("/billing", billingRouter);

//Lakshitha
const URL = process.env
const StaffMemberRouter = require("./routes/staffMembers.js");
const SalaryRouter = require("./routes/salaries.js");
app.use("/StaffMember", StaffMemberRouter);
app.use("/Salary", SalaryRouter);

//Jithma
const doctorRoutes = require("./routes/doctor");
app.use("/doctor", doctorRoutes);

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
