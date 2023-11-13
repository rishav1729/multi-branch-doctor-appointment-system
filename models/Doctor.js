const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  availability: [
    {
      branchName: String,
      startTime: Number,
      endTime: Number,
    },
  ],
});

module.exports = mongoose.model('Doctor', doctorSchema);