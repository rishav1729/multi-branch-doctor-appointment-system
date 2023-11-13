const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  doctorName: String,
  branchName: String,
  appointmentTime: Number,
});

module.exports = mongoose.model('Patient', patientSchema);