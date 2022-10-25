const router = require('express').Router();
const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require('../controllers/usersController');

router.post('/register', register);
router.post('/login', login);
router.post('/avatar/:id', setAvatar);
router.get('/alluser/:id', getAllUsers);

module.exports = router;
