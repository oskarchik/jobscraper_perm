const router = require('express').Router();
const { v4: uuidv4, v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Token } = require('../../db');
const { generateAccessToken } = require('../../middlewares/auth.middleware');

//==========REGISTER============

router.post('/register', async (req, res) => {
  //check if user exists check other projects
  //if does return already register
  //if doesn't register
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id: v4(),
      name,
      email,
      password: hash,
    });
    return res.json({ newUser });
  } catch (error) {
    return res.json({ error });
  }
});

//===============LOGIN==============

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email }, raw: true });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const accessToken = generateAccessToken(user);

      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY);
      const id = v4();
      const newRefreshToken = await Token.create({
        id,
        token: refreshToken,
      });
      return res.json({ accessToken, refreshToken });
    } else {
      return res.json('Wrong credentials');
    }
  } catch (error) {
    return res.json(error);
  }
});

//==============NEW ACCESS TOKEN====================

router.post('/token', async (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  isValidToken = await Token.findOne({
    where: {
      token: refreshToken,
    },
    raw: true,
  });
  if (!isValidToken) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ id: user.name });
    return res.json({ accessToken });
  });
});

//=============LOGOUT==========================

router.delete('/logout', async (req, res, next) => {
  const { token } = req.body;
  const existingToken = await Token.findOne({
    where: {
      token,
    },
    raw: true,
  });
  console.log('existingToken', existingToken);
  if (!existingToken) return res.sendStatus(404);
  try {
    const deletedToken = await Token.destroy({
      where: {
        id: existingToken.id,
      },
      raw: true,
    });
    console.log('deletedToken', deletedToken);
    return res.json({ msg: `token deleted ${deletedToken}` });
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
