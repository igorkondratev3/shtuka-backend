const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const additionalSchema = new Schema({
  circle: {
    type: Number,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  lesson: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Additional', additionalSchema);