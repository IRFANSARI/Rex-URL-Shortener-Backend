const router = require('express').Router();
const userController = require('../controllers/userController.js');

router.post('/login', userController.signIn);
router.post('/signup', userController.signUp);
router.get('/logout', userController.signOut);

module.exports = router;
