const User = require('../models/userModel');
const RefreshToken = require('../models/refreshTokenModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return  jwt.sign({_id}, process.env.SECRET_FOR_TOKEN, { expiresIn: '15m' });
}

const createRefreshToken = (_id) => {
  return  jwt.sign({_id}, process.env.SECRET_FOR_REFRESH_TOKEN, { expiresIn: '7d' });
}

const addRefreshTokenInDB = async (user_id, refreshToken) => {
  const refreshTokenExists = await RefreshToken.findOne({ user_id }); 
  if (refreshTokenExists) await RefreshToken.updateOne({ user_id }, {$set: { refreshToken }});
  else await RefreshToken.create({user_id, refreshToken });
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    const refreshTokenValue = createRefreshToken(user._id);
    await addRefreshTokenInDB(user._id, refreshTokenValue);

    res.status(200).json({email, token, refreshToken: refreshTokenValue});
  } catch (error) {
      res.status(400).json({error: error.message});
  }
}

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);
    const refreshTokenValue = createRefreshToken(user._id);
    await addRefreshTokenInDB(user._id, refreshTokenValue); // лишние проверки в функции при создании учетной записи
    
    res.status(200).json({email, token, refreshToken: refreshTokenValue})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
 }

 module.exports = {
  loginUser,
  signupUser
}