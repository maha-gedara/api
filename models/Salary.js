const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({

  employeeID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  }
});

const Salary = mongoose.model("Salary", SalarySchema);
module.exports = Salary;