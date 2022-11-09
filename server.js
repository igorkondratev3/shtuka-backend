require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const lessonRoutes = require('./routes/lessons');
const theoryNoteRoutes = require('./routes/theoryNotes');
const userRoutes = require('./routes/user');
const additionalsRoutes = require('./routes/additionals');

const app = express();

app.use(cors({ 
  exposedHeaders:process.env.FRONTEND_URI
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
    console.log('connecting to db & listening on port', process.env.PORT)
    });
  })
  .catch((error) => {
    console.log(error)
  });

  app.use('/lesson', lessonRoutes);
  app.use('/lesson/theory-notes', theoryNoteRoutes);
  app.use('/user', userRoutes);
  app.use('/lesson/additionals', additionalsRoutes);