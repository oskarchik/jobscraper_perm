const router = require('express').Router();
const { register, logIn, newAccessToken, logOut } = require('../../controllers/auth.controller');

router.post('/register', register);

router.post('/login', logIn);

router.post('/token', newAccessToken);

router.delete('/logout', logOut);

module.exports = router;
