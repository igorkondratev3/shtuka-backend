const express = require('express');
const {  
  createAdditional,
  getAdditionals,
  deleteAdditional,
  editAdditional,
  copyAdditional
} = require('../controllers/additionalController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

router.use(requireAuth);
router.post('/copy', copyAdditional);
router.post('/', createAdditional);
router.get('/:circleNum/:gradeNum/:lessonNum', getAdditionals);
router.delete('/:id', deleteAdditional);
router.patch('/', editAdditional);

module.exports = router; 