const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'your_jwt_secret');
};

module.exports = {
  generateToken,
  verifyToken,
};
