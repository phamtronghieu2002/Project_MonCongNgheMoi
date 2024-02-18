const mongoose = require("mongoose");
// mongoose.set('debug', true);
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    content: {
      type: String,
    },
    isSeen: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
