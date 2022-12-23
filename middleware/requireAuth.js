const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]; //так как токен будет получаться в формате типа "Bearer fdgfdgd.dfgdfgfd.dfgdfgdf",
  
  let _id;

  try {
    _id = jwt.verify(token, process.env.SECRET)._id;
  } catch (error) {
    return res.status(401).json({error: 'Необходимо предоставить refreshToken'});
  }
  
  req.user = await User.findOne({ _id }).select('_id') //создаем объект user в запросе, чтобы следующие маршруты если они выполняются могли его использовать
  if (!req.user) return res.status(401).json({error: 'Информация о пользователе отсутствует'});
  next();
};

module.exports = requireAuth;