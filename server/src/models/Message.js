const mongoose = require("mongoose");
// mongoose.set('debug', true);
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      ref: "Conversation",
    },
    senderId: {
      type: String,
      ref: "User",
    },
    content: {
      type: String,
    },
    isSeen: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
