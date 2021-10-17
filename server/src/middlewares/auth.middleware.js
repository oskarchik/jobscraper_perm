const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = payload;
    next();
  });
};

const generateAccessToken = (user) => {
  try {
    const token = jwt.sign(user, process.env.TOKEN_KEY, { expiresIn: '20s' });
    return token;
  } catch (error) {
    console.log('error', error);
  }
};
module.exports = { authenticateToken, generateAccessToken };
