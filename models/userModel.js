const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.signup = async function (email, password) {

  if (!validator.isEmail(email)) {
     throw Error('Email введен не корректно')
  }
  if (!validator.isStrongPassword(password)) {
     throw Error('Пароль недостаточно надежный')
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error('Email уже используется')
  }

  const salt = await bcrypt.genSalt(10); 
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
}

userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error('Все поля должны быть заполнены')
  }

  const user = await this.findOne({ email }); 
  
  if (!user) {
    throw Error('Некорректный email')
  }

  const match = await bcrypt.compare(password, user.password) 

  if (!match) {
    throw Error('Некорректный пароль');
  }

  return user
}

module.exports = mongoose.model('User', userSchema) 