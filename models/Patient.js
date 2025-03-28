const mongoose = require("mongoose");

// Define schema for patient records
const PatientSchema = new mongoose.Schema({
    patientID: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String,
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    telephoneNumber: { 
        type: String, 
        required: true 
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    symptoms: [{
        date: { type: Date, default: Date.now },
        symptoms: [String], // List of symptoms
        assumedDisease: { type: String, default: "Not diagnosed yet" }
    }]
});

// Create and export Patient model
const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
