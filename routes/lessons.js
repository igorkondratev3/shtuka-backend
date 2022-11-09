const express = require('express');
const {  
  getLesson,
  getLessons
} = require('../controllers/lessonController');
const router = express.Router();

router.get('/:circleNum/:gradeNum', getLessons);
router.get('/:circleNum/:gradeNum/:lessonNum', getLesson);

module.exports = router;