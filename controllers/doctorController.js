// doctorController.js

const Doctor = require('../models/Doctor');


// Create a new doctor
exports.createDoctor = async (req, res) => {
  try
  {
    const { name, availability } = req.body;
    console.log("req", req.body);
    console.log("availability", req.body.availability);
    const doctor = new Doctor({ name, availability });
    // console.log("doctor", doctor);
    const savedDoctor = await doctor.save();
    // console.log("savedDoctor", savedDoctor);
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get a single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update a doctor by ID
exports.updateDoctor = async (req, res) => {
  try {
    const { name, availability } = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, availability },
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a doctor by ID
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndRemove(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(deletedDoctor);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Check doctor availability
exports.checkAvailability = async (req, res) => {
  try {
    const { doctorId, branchName, startTime, endTime } = req.body;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if the doctor has an availability slot that matches the input
    const availabilitySlot = doctor.availability.find(
      (slot) =>
        slot.branchName === branchName &&
        slot.startTime === startTime &&
        slot.endTime === endTime
    );

    if (availabilitySlot) {
      res.json({ available: true });
    } else {
      res.json({ available: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};