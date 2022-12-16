const express = require('express');
const {  
  createTheoryNote,
  getTheoryNotes,
  deleteTheoryNote,
  editTheoryNote
} = require('../controllers/theoryNoteController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

router.use(requireAuth);
router.post('/', createTheoryNote);
router.get('/:circleNum/:gradeNum/:lessonNum', getTheoryNotes);
router.delete('/:id', deleteTheoryNote);
router.patch('/', editTheoryNote);

module.exports = router; 