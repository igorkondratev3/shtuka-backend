const RefreshToken = require('../models/refreshTokenModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const deleteRefreshToken = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Необходим refreshToken'})
  }

  const refreshToken = authorization.split(' ')[1]; //так как токен будет получаться в формате типа "Bearer fdgfdgd.dfgdfgfd.dfgdfgdf",
  await RefreshToken.deleteOne({ refreshToken });
  res.status(200).json({message: "End"}); 
}

const updateTokens = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({error: 'Необходим refreshToken'});

  const refreshTokenValue = authorization.split(' ')[1];

  let _id;
  try {
    _id = jwt.verify(refreshTokenValue, process.env.SECRET)._id;
  } catch (error) {
    console.log(error);
    return res.status(401).json({error: 'Необходимо повторно осуществить вход'});
  }

  const refreshTokenExists = await RefreshToken.findOne({ refreshToken: refreshTokenValue }); 
  if (!refreshTokenExists) return res.status(401).json({error: 'Необходимо повторно осуществить вход'});

  const newToken = jwt.sign({_id}, process.env.SECRET, { expiresIn: '15m' });
  const newRefreshToken = jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d' }) //поменять секрет

  await RefreshToken.updateOne({ user_id: _id }, {$set: { refreshToken: newRefreshToken }});
  
  res.status(200).json({token: newToken, refreshToken: newRefreshToken});
}

module.exports = {
  deleteRefreshToken,
  updateTokens
}
