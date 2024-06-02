const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'your_jwt_secret');
  } catch (err) {
    return res.status(500).json({ message: 'Token is invalid or expired' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  req.userId = decodedToken.id;
  next();
};

module.exports = isAuth;
