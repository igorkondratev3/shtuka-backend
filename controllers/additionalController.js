const Additional = require('../models/additionalModel');
const mongoose = require('mongoose');

const createAdditional = async (req, res) => {
  const { circle, grade, lesson, address, name, description } = req.body;
  try {
    const user_id = req.user._id;
    const additional = await Additional.create({circle, grade, lesson, user_id, address, name, description});
    res.status(200).json(additional)
  } catch(error) {
    res.status(400).json({ error: error.message})
  }
}

const getAdditionals = async (req, res) => {
  const { circleNum, gradeNum, lessonNum } = req.params;
  const user_id = req.user.id;
  const additionals = await Additional.find({
    circle: circleNum,
    grade: gradeNum,
    lesson: lessonNum,
    user_id: user_id
  });
  
  res.status(200).json(additionals);
}

const deleteAdditional = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Нет такого объекта'})
  }

  const additional = await Additional.findOneAndDelete({_id: id});

  if (!additional) {
    return res.status(400).json({error: 'Нет такого объекта'});
  }

  res.status(200).json(additional);
}

module.exports = {
  createAdditional,
  getAdditionals,
  deleteAdditional
}