const TheoryNote = require('../models/theoryNoteModel');
const mongoose = require('mongoose');

const createTheoryNote = async (req, res) => {
  const { circle, grade, lesson, text, textStyle } = req.body;
  try {
    const user_id = req.user._id;
    const theoryNote = await TheoryNote.create({circle, grade, lesson, text, user_id, textStyle});
    res.status(200).json(theoryNote)
  } catch(error) {
    res.status(400).json({ error: error.message})
  }
}

const getTheoryNotes = async (req, res) => {
  const { circleNum, gradeNum, lessonNum } = req.params;
  const user_id = req.user.id;
  const theoryNotes = await TheoryNote.find({
    circle: circleNum,
    grade: gradeNum,
    lesson: lessonNum,
    user_id: user_id
  });
  
  res.status(200).json(theoryNotes);
}

const deleteTheoryNote = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Нет такого объекта'})
  }

  const theoryNote = await TheoryNote.findOneAndDelete({_id: id});

  if (!theoryNote) {
    return res.status(400).json({error: 'Нет такого объекта'});
  }

  res.status(200).json(theoryNote);
}

module.exports = {
  createTheoryNote,
  getTheoryNotes,
  deleteTheoryNote
}
