const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
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
  headings: {
    type: Array,
    required: true
  },
  videoLessonURL: {
    type: String,
    required: true
  },
  textBook: {
    type: String,
    required: true
  },
  bookUrl: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Lesson', lessonSchema);