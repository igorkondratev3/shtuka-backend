const RefreshToken = require('../models/refreshTokenModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const deleteRefreshToken = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Необходим refreshToken'})
  }

  const refreshToken = authorization.split(' ')[1];
  await RefreshToken.deleteOne({ refreshToken });
  res.status(200).json({message: "End"}); 
}

const updateTokens = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({error: 'Необходим refreshToken'});

  const refreshTokenValue = authorization.split(' ')[1];

  let _id;
  try {
    _id = jwt.verify(refreshTokenValue, process.env.SECRET_FOR_REFRESH_TOKEN)._id;
  } catch (error) {
    console.log(error);
    return res.status(401).json({error: 'Необходимо повторно осуществить вход'});
  }

  const refreshTokenExists = await RefreshToken.findOne({ refreshToken: refreshTokenValue }); 
  if (!refreshTokenExists) return res.status(401).json({error: 'Необходимо повторно осуществить вход'});

  const newToken = jwt.sign({_id}, process.env.SECRET_FOR_TOKEN, { expiresIn: '15m' });
  const newRefreshToken = jwt.sign({_id}, process.env.SECRET_FOR_REFRESH_TOKEN, { expiresIn: '7d' });

  await RefreshToken.updateOne({ user_id: _id }, {$set: { refreshToken: newRefreshToken }});
  
  res.status(200).json({token: newToken, refreshToken: newRefreshToken});
}

module.exports = {
  deleteRefreshToken,
  updateTokens
}
