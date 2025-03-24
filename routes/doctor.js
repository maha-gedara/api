const express = require("express");
const Doctor = require("../models/Doctor.js");

const router = express.Router();

// Add Doctor Details with Availability
router.post("/add", async function (req, res) {
  const { fName, special, cNumber, email, availability } = req.body;

  // Validate the request
  if (!fName || !special || !cNumber || !email || !availability) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Create a new doctor with availability data
  const newDoctor = new Doctor({
    fName,
    special,
    cNumber,
    email,
    availability, // Use the availability data sent in the request
  });

  try {
    await newDoctor.save();
    res.status(201).json({ message: "Successfully Added Doctor Details." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Adding Doctor Details." });
  }
});

// Get all Doctor Details
router.get("/", async function (req, res) {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Fetching Doctor Details." });
  }
});

// Get Doctor by ID
router.get("/:id", async function (req, res) {
  try {
    const docget = await Doctor.findById(req.params.id);
    if (!docget) {
      return res.status(404).json({ error: "Doctor ID Not Found" });
    }
    res.status(200).json(docget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error Fetching Doctor Profile" });
  }
});

// Update Doctor Details
router.put("/:id", async function (req, res) {
  const userId = req.params.id;
  const { fName, special, cNumber, email, availability } = req.body;

  // Validate that at least one field is provided for updating
  if (!fName && !special && !cNumber && !email && !availability) {
    return res.status(400).json({ error: "At least one field is required to update." });
  }

  const updatedDoctor = {
    fName,
    special,
    cNumber,
    email,
    availability, // Updated availability data
  };

  try {
    const updatedDoc = await Doctor.findByIdAndUpdate(userId, updatedDoctor, { new: true });
    if (!updatedDoc) {
      return res.status(404).json({ error: "Doctor Details not found" });
    }
    res.status(200).json({ message: "Successfully Updated Doctor Details", doctor: updatedDoc });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error with Updating Doctor Details", message: err.message });
  }
});

// Update Doctor Availability (Add Time Slots for Specific Day)
router.put("/:id/availability", async function (req, res) {
  const userId = req.params.id;
  const { day, startTime, endTime } = req.body;

  // Validate the request
  if (!day || !startTime || !endTime) {
    return res.status(400).json({ error: "Day, start time, and end time are required." });
  }

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(userId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Find or create the availability for the selected day
    let availability = doctor.availability.find((entry) => entry.day === day);

    if (!availability) {
      availability = {
        day: day,
        timeSlots: [],
      };
      doctor.availability.push(availability);
    }

    // Add the new time slot to the availability
    availability.timeSlots.push({ startTime, endTime });

    // Save the updated doctor record
    await doctor.save();
    res.status(200).json({ message: "Doctor availability updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating availability", message: err.message });
  }
});

// Delete Doctor Details
router.delete("/:id", async function (req, res) {
  const userId = req.params.id;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(userId);
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor Details not found" });
    }
    res.status(200).json({ message: "Deleted Successfully Doctor Details" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error with Deleting Doctor Details", message: err.message });
  }
});

module.exports = router;
