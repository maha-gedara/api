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


//Sanduni inventory
const inventoryRouter = require("./routes/inventory.js");
app.use("/inventory", inventoryRouter);

//Sanduni billing
const billingRouter = require("./routes/billing.js");
app.use("/billing", billingRouter);

//Lakshitha

//Jithma

//Primal



// Default Route
app.get("/", (req, res) => {
  res.send(`We are connected! Running on port ${process.env.PORT}`);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
