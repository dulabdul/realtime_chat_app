const router = require('express').Router();
const {
  addMessage,
  getAllMessage,
} = require('../controllers/messageController');

router.post('/addmsg/', addMessage);
router.post('/getmsg/', getAllMessage);

module.exports = router;
