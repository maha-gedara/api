const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const { spawn } = require("child_process"); // Used to run Python script

// ✅ Create a new patient
router.post("/add", async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully", patient: newPatient });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Get all patients
router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get a single patient by ID
router.get("/:id", async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.params.id });
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update patient record (add new symptoms)
router.put("/update/:id", async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.params.id });
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        // Add new symptoms to existing patient
        patient.symptoms.push(req.body);
        await patient.save();
        res.json({ message: "Patient updated successfully", patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete a patient
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedPatient = await Patient.findOneAndDelete({ patientID: req.params.id });
        if (!deletedPatient) return res.status(404).json({ message: "Patient not found" });
        res.json({ message: "Patient deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Predict Disease (calls Python script)
router.post("/predict", async (req, res) => {
    const symptoms = req.body.symptoms;
    
    const python = spawn("python", ["predictor.py", JSON.stringify(symptoms)]);

    let result = "";
    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        console.error(`Python error: ${data}`);
    });

    python.on("close", (code) => {
        if (code === 0) {
            res.json({ assumedDisease: result.trim() });
        } else {
            res.status(500).json({ error: "AI prediction failed" });
        }
    });
});

module.exports = router;
