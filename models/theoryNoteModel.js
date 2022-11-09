const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const theoryNoteSchema = new Schema({
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
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  textStyle: {
    fontSize: {
      type:String,
      required: false
    },
    color: {
      type:String,
      required: false
    },
    fontFamily: {
      type:String,
      required: false
    },
    fontWeight: {
      type:String,
      required: false
    },
    fontStyle: {
      type:String,
      required: false
    },
    textDecoration: {
      type:String,
      required: false
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    }
  }
});

module.exports = mongoose.model('TheoryNote', theoryNoteSchema);