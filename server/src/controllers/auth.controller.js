const bcrypt = require('bcryptjs');
const { v4: uuidv4, v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { User, Token } = require('../db');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/auth.middleware');

//==========REGISTER============

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ msg: 'all fields are required' });
  }
  try {
    const existingUser = await User.findOne({ where: { email: email }, raw: true });
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
  console.log('aqui');
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

    const accessToken = generateAccessToken(user.email);

    const refreshToken = generateRefreshToken(user.email);

    const id = v4();

    const newRefreshToken = await Token.create({
      t_id: id,
      token: refreshToken,
      user_id: user.id,
    });
    return res
      .cookie('token', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({ accessToken, user });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

//==============NEW ACCESS TOKEN====================

const newAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies?.token;

  if (!refreshToken) return res.status(401).json({ msg: 'unauthorized' });

  const isValidToken = await Token.findOne({
    where: {
      token: refreshToken,
    },
    raw: true,
  });
  if (!isValidToken) return res.status(403).json({ msg: 'no token in db' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).json({ msg: 'invalid token' });
    const accessToken = generateAccessToken(user.email);
    return res.status(200).json({ accessToken });
  });
};

//=============LOGOUT==========================

const logOut = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(204);

  const existingToken = await Token.findOne({
    where: {
      token,
    },
    raw: true,
  });

  if (!existingToken) return res.status(404).json({ msg: 'impossible to logout, please try again' });

  console.log('exisiting Token', existingToken);
  try {
    await Token.destroy({
      where: {
        t_id: existingToken.t_id,
      },
      raw: true,
    });
    return res.clearCookie('token', { httpOnly: true }).status(200).json({ msg: 'you are logged out' }); // on production secure true -- only serves in https
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
