const router = require('express').Router();
const { register, logIn, newAccessToken, logOut } = require('../../controllers/auth.controller');

router.post('/register', register);

router.post('/login', logIn);

router.get('/token', newAccessToken);

router.get('/logout', logOut);

module.exports = router;
