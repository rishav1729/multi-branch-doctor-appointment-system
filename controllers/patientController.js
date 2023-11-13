const express = require('express');

const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const app = express();
const cors = require('cors');
app.use(cors());
// Create a new patient appointment
exports.createPatient = async (req, res) => {
  try {
    const { name, doctorName, branchName, appointmentTime } = req.body;

    // Check if the doctor is available at the specified time and branch

    const doctor = await Doctor.findOne({
      name: doctorName,
      'availability.branchName': branchName,
      'availability.startTime': {$lte: appointmentTime},
      'availability.endTime': {$gte: appointmentTime}
    });
    console.log("doctor found",Doctor);

    if (!doctor) {
      return res.status(400).json({ error: 'Doctor not available at that time and branch' });
    }

    const patient = new Patient({ name, doctorName, branchName, appointmentTime });
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndRemove(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(deletedPatient);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};