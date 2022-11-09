const express = require('express');
const {  
  createAdditional,
  getAdditionals,
  deleteAdditional
} = require('../controllers/additionalController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

router.use(requireAuth);
router.post('/', createAdditional);
router.get('/:circleNum/:gradeNum/:lessonNum', getAdditionals);
router.delete('/:id', deleteAdditional);

module.exports = router; 