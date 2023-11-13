const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Create a new patient appointment
router.post('/', patientController.createPatient);

// Get all patients
router.get('/', patientController.getAllPatients);

// Get a single patient by ID
router.get('/:id', patientController.getPatientById);

// Delete a patient by ID
router.delete('/:id', patientController.deletePatient);

module.exports = router;