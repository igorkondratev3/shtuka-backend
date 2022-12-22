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

const copyTheoryNote = async (req, res) => {
 try {
    const { _id } = req.body;
    const user_id = req.user.id; 

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error ('Нет такого объекта')
    }

    const theoryNote = await TheoryNote.findOne({ _id });  
    
    if (!theoryNote) {
      throw Error ('Нет такого объекта');
    }
  
    if (theoryNote.user_id !== user_id) {
      throw Error ('Отсутствуют права');
    }

    const { circle, grade, lesson, text, textStyle } = theoryNote;
    const copyTheoryNote = await TheoryNote.create({circle, grade, lesson, text, user_id, textStyle});
    res.status(200).json(copyTheoryNote)
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

  if (!theoryNotes[0]) {
    return res.status(404).json({error: 'Не удалось получить пометки'})
  }
  
  res.status(200).json(theoryNotes);
}

const deleteTheoryNote = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Нет такого объекта'})
  }

  const theoryNote = await TheoryNote.findOne({_id: id});

  if (!theoryNote) {
    return res.status(400).json({error: 'Нет такого объекта'});
  }

  if (theoryNote.user_id !== req.user.id) { //почему-то работает id - получается строка хотя req.user это { _id: new ObjectId("6380a62a1f9b2cccd62a4907") } 
    return res.status(400).json({error: 'Отсутствуют права'});
  }

  await TheoryNote.deleteOne({_id: id});

  res.status(200).json(theoryNote);
}

const editTheoryNote = async (req, res) => {
  const { _id, text, textStyle } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: 'Нет такого объекта'})
  }

  const theoryNote = await TheoryNote.findOneAndUpdate({_id: _id}, {$set: { text, textStyle }}, {returnDocument: "after"})

  if (!theoryNote) {
    return res.status(400).json({error: 'Нет такого объекта'});
  }

  if (theoryNote.user_id !== req.user.id) { //почему-то работает id - получается строка хотя req.user это { _id: new ObjectId("6380a62a1f9b2cccd62a4907") } 
    return res.status(400).json({error: 'Отсутствуют права'});
  }

  res.status(200).json(theoryNote);
}

module.exports = {
  createTheoryNote,
  getTheoryNotes,
  deleteTheoryNote,
  editTheoryNote,
  copyTheoryNote
}
