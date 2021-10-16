const router = require('express').Router();
const { v4: uuidv4, v4 } = require('uuid');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { User } = require('../../db');

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

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return res.json({ success: createToken(user) });
    } else {
      return res.json('Wrong credentials');
    }
  } catch (error) {
    return res.json(error);
  }
});

const createToken = (user) => {
  const payload = {
    userId: user.id,
    createdAt: Date.now(),
  };
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: 5 * 60 * 1000,
  });
  return token;
};
module.exports = router;
