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
  const cookies = req.cookies;
  const refreshToken = cookies?.token;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ msg: 'all fields are required, please try again' });
  }
  try {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return res.status(403).json({ msg: 'Wrong credentials, please try again' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({ msg: 'wrong credentials, please try again' });
    }

    const accessToken = generateAccessToken(user.email);

    const newRefreshToken = generateRefreshToken(user.email);

    const id = v4();

    const refreshTokensArray = !refreshToken
      ? await Token.create({
          t_id: id,
          token: newRefreshToken,
          user_id: user.id,
        })
      : await Token.destroy({
          where: {
            t_id: refreshToken.t_id,
          },
          raw: true,
        });

    if (refreshToken) {
      const foundToken = await Token.findOne({
        where: {
          t_id: refreshToken.t_id,
        },
        raw: true,
      });
      if (!foundToken) {
        const removedTokens = await Token.destroy({
          where: {
            user_id: foundToken.user_id,
          },
        });
      }
    }

    res.clearCookie('token', { httpOnly: true });

    return res
      .cookie('token', newRefreshToken, {
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
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({ msg: 'unauthorized' });

  const refreshToken = cookies.token;
  res.clearCookie('token', { httpOnly: true });

  const isValidToken = await Token.findOne({
    where: {
      token: refreshToken,
    },
    raw: true,
  });

  //Detected refresh token reuse
  if (!isValidToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({ msg: 'no token in db' });
      }

      const hackedUser = await User.findOne({
        where: {
          id: user.id,
        },
        raw: true,
      });

      const hackedTokens = await Token.findAll({
        where: {
          user_id: user.id,
        },
        attributes: ['t_id'],
        raw: true,
      });

      if (hackedTokens) {
        const result = await Token.destroy({
          where: {
            t_id: hackedTokens,
          },
        });
        console.log('result', result);
      }
      console.log('user tokens', hackedTokens);
    });
    return res.status(403).json({ msg: 'no token in db' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, user) => {
    if (err) return res.status(403).json({ msg: 'invalid token' });
    const accessToken = generateAccessToken(user.email);
    const newRefreshToken = generateRefreshToken(user.email);
    const id = v4();

    const removedToken = await Token.destroy({ where: { token: isValidToken.token } });

    try {
      const savedRefreshToken = await Token.create({
        t_id: id,
        token: newRefreshToken,
        user_id: isValidToken.user_id,
      });
    } catch (error) {
      console.log(error);
    }

    res.cookie('token', newRefreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ accessToken });
  });
};

//=============LOGOUT==========================

const logOut = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.token) return res.status(204);

  const refreshToken = cookies.token;

  try {
    const existingToken = await Token.findOne({
      where: {
        token: refreshToken,
      },
      raw: true,
    });

    if (!existingToken) {
      res.clearCookie('token', { httpOnly: true });
      return res.sendStatus(204);
    }

    const deletedToken = await Token.destroy({
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
