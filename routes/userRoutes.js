const router = require('express').Router();
const {
  register,
  login,
  setAvatar,
  getAllUsers,
  // logout,
} = require('../controllers/usersController');

router.post('/register', register);
router.post('/login', login);
// router.post('/logout/:id', logout);
router.post('/avatar/:id', setAvatar);
router.get('/allusers/:id', getAllUsers);

module.exports = router;
