const jwt = require('jsonwebtoken');

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: '2h',
  });

module.exports = createToken;
