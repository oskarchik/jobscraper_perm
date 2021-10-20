const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.status(401).json({ msg: 'unauthorized access' });

  jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
    if (err) return res.status(403).json({ msg: 'forbidden access' });
    req.user = payload;
    next();
  });
};

const generateAccessToken = (user) => {
  try {
    const token = jwt.sign(user, process.env.TOKEN_KEY, { expiresIn: '10m' });
    return token;
  } catch (error) {
    console.log('error', error);
  }
};
module.exports = { authenticateToken, generateAccessToken };
