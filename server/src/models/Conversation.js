const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    isGroup: {
      type: Boolean,
    },
    lastMessage: {
      type: String,
      default: "",  
    },
  },
  {
    timestamps: { currentTime: () => new Date() },
    timezone: 'Asia/Ho_Chi_Minh' // replace with your actual timezone
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
