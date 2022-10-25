const Messages = require('../models/messageModel');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    if (data)
      return res.json({
        msg: 'Message success added',
      });
    else
      return res.json({
        msg: 'Message failed to add database',
      });
  } catch (ex) {
    next(ex);
  }
};


module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updateAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: msg.created_at,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
