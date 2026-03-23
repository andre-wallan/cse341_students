const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  course: String,
  year: Number,
  gender: String,
  enrollmentDate: String
});

module.exports = mongoose.model('Student', studentSchema);