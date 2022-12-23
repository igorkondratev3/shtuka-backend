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

const copyAdditional = async (req, res) => {
  try {
    const { _id } = req.body;
    const user_id = req.user.id; 

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error ('Нет такого объекта')
    }

    const additional = await Additional.findOne({ _id });  
    
    if (!additional) {
      throw Error ('Нет такого объекта');
    }
  
    if (additional.user_id !== user_id) {
      throw Error ('Отсутствуют права');
    }

    const { circle, grade, lesson, address, name, description } = additional;
    const copyAdditional = await Additional.create({circle, grade, lesson, user_id, address, name, description});
    res.status(200).json(copyAdditional)
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

  const additional = await Additional.findOne({_id: id})

  if (!additional) {
    return res.status(400).json({error: 'Нет такого объекта'});
  }

  if (additional.user_id !== req.user.id) {
    return res.status(400).json({error: 'Отсутствуют права'});
  }
  
  await Additional.deleteOne({_id: id});

  res.status(200).json(additional);
}

const editAdditional = async (req, res) => {
  const { _id, address, name, description } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: 'Нет такого объекта'})
  }

  const additional = await Additional.findOneAndUpdate({_id: _id}, {$set: { address, name, description }}, {returnDocument: "after"})

  if (!additional) {
    return res.status(400).json({error: 'Нет такого объекта'});
  }

  if (additional.user_id !== req.user.id) { //почему-то работает id - получается строка хотя req.user это { _id: new ObjectId("6380a62a1f9b2cccd62a4907") } 
    return res.status(400).json({error: 'Отсутствуют права'});
  }

  res.status(200).json(additional);
}

module.exports = {
  createAdditional,
  getAdditionals,
  deleteAdditional,
  editAdditional,
  copyAdditional
}
