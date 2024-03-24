const mongoose = require("mongoose");
mongoose.set('debug', true);
const moment = require('moment-timezone');

// Define a custom plugin to format createdAt and updatedAt fields
const customTimestampsPlugin = (schema, options) => {
  schema.add({
    createdAt: {
      type: String,
      default: () => moment.tz(Date.now(), "Asia/Ho_Chi_Minh").format("DD-MM-YYYY HH:mm:ss")
    },
    updatedAt: {
      type: String,
      default: () => moment.tz(Date.now(), "Asia/Ho_Chi_Minh").format("DD-MM-YYYY HH:mm:ss")
    }
  });

  schema.pre('save', function (next) {
    this.updatedAt = moment.tz(Date.now(), "Asia/Ho_Chi_Minh").format("DD-MM-YYYY HH:mm:ss");
    next();
  });
};

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
    }
  }
);

// Apply the custom timestamps plugin
MessageSchema.plugin(customTimestampsPlugin);

// Apply the timestamps option to the schema
MessageSchema.set('timestamps', true);

module.exports = mongoose.model("Message", MessageSchema);
