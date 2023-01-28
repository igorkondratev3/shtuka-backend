const express = require('express');
const router = express.Router();
const lessonRoutes = require('./lessons.js');
const theoryNoteRoutes = require('./theoryNotes.js');
const userRoutes = require('./user.js');
const additionalsRoutes = require('./additionals.js');
const refreshTokenRoutes = require('./refreshToken.js');

router.use('/lesson', lessonRoutes);
router.use('/lesson/theory-notes', theoryNoteRoutes);
router.use('/user', userRoutes);
router.use('/lesson/additionals', additionalsRoutes);
router.use('/refreshToken', refreshTokenRoutes);

module.exports = router;

