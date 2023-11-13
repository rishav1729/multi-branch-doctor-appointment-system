const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: String,
  address: String,
});

module.exports = mongoose.model('Branch', branchSchema);