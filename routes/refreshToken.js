const express = require('express');
const {  
  deleteRefreshToken,
  updateTokens
} = require('../controllers/refreshTokenController');
const router = express.Router();

router.delete('/', deleteRefreshToken);
router.post('/', updateTokens);

module.exports = router; 