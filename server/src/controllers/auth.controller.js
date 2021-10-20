const bcrypt = require('bcryptjs');
const { v4: uuidv4, v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { User, Token } = require('../db');
const { generateAccessToken } = require('../middlewares/auth.middleware');

//==========REGISTER============

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || password) {
    return res.status(422).json({ msg: 'all fields are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'some error occurred, please try again' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id: v4(),
      name,
      email,
      password: hash,
    });

    return res.status(200).json({ newUser });
  } catch (error) {
    return res.json({ msg: error });
  }
};

//===============LOGIN==============

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ msg: 'all fields are required, please try again' });
  }
  try {
    const user = await User.findOne({ where: { email: email }, raw: true });

    if (!user) {
      return res.status(403).json({ msg: 'wrong credentials, please try again' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({ msg: 'wrong credentials, please try again' });
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY);
    const id = v4();
    const newRefreshToken = await Token.create({
      id,
      token: refreshToken,
    });
    return res.json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

//==============NEW ACCESS TOKEN====================

const newAccessToken = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.status(401).json({ msg: 'unauthorized' });
  isValidToken = await Token.findOne({
    where: {
      token: refreshToken,
    },
    raw: true,
  });
  if (!isValidToken) return res.status(403).json({ msg: 'invalid token' });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).json({ msg: 'invalid token' });
    const accessToken = generateAccessToken({ id: user.name });
    return res.status(200).json({ accessToken });
  });
};

//=============LOGOUT==========================

const logOut = async (req, res, next) => {
  const { token } = req.body;
  const existingToken = await Token.findOne({
    where: {
      token,
    },
    raw: true,
  });

  if (!existingToken) return res.status(404).json({ msg: 'impossible to logout, please try again' });
  try {
    const deletedToken = await Token.destroy({
      where: {
        id: existingToken.id,
      },
      raw: true,
    });
    return res.status(200).json({ msg: 'you are logged out' });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  register,
  logIn,
  newAccessToken,
  logOut,
};
