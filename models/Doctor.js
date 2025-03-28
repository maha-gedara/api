const mongoose = require('mongoose');

const { Schema } = mongoose;

const DoctorSchema = new Schema({
  fName: {
    type: String,
    required: false,
  },

  special: {
    type: [String],
    required: false,
  },

  cNumber: {
    type: Number,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  // Days and their available times
  availability: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
      },
      timeSlots: [
        {
          startTime: {
            type: String, // Example: "10:00 AM"
            required: true,
          },
          endTime: {
            type: String, // Example: "2:00 PM"
            required: true,
          },
        },
      ],
    },
  ],
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
