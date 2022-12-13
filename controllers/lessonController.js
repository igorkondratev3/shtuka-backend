const Lesson = require('../models/lessonModel');

const getLesson = async (req, res) => {
  const { circleNum, gradeNum, lessonNum } = req.params;
  const lesson = await Lesson.findOne({
    circle: circleNum,
    grade: gradeNum,
    lesson: lessonNum 
  }, { _id: false });
  
  if (!lesson) {
    return res.status(404).json({error: 'Урока не существует'})
  }
  res.status(200).json(lesson);
};

const getLessons = async (req, res) => {
  const { circleNum, gradeNum } = req.params;
  const lessons = await Lesson.find({
    circle: circleNum,
    grade: gradeNum,
  }, { _id: false });
  
  if (!lessons[0]) {
    return res.status(404).json({error: 'Уроков не существует'})
  }
  res.status(200).json(lessons);
}


module.exports = {
  getLesson,
  getLessons
}