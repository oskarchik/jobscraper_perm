const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ msg: 'unauthorized access' });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'unauthorized access' });

  jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
    if (err) return res.status(403).json({ msg: 'forbidden access' });
    req.user = payload.email;
    next();
  });
};

const generateAccessToken = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '10m' }); // 5 to 15 minutes in production

    return token;
  } catch (error) {
    console.log('error', error);
  }
};
const generateRefreshToken = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: 24 * 60 * 60 * 1000 });

    return token;
  } catch (error) {
    console.log('error', error);
  }
};
module.exports = { authenticateToken, generateAccessToken, generateRefreshToken };
