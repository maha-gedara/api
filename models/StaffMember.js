const mongoose = require("mongoose");

const StaffMemberSchema = new mongoose.Schema({

  employeeID: {
    type: String,
    required: true
  },
  name: { 
    type: String, 
    required: true 
    },
  age: { 
    type: Number, 
    required: true 
    },
  gender: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  jobtype: {
    type: String,
    required: true
  }
});

const StaffMember = mongoose.model("StaffMember", StaffMemberSchema);

module.exports = StaffMember;