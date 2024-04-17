const mongoose = require("mongoose");
mongoose.set('debug', true);
const moment = require('moment-timezone');

// Import enum from mongoose
const { Schema } = mongoose;


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
    next(); // Ensure to call next() to proceed with the save operation
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
    type: {
      type: String,
      enum: ["text", "image", "file", "icon", "sticker"],
      default: "text",
    },
    reaction: {
      type: String,
      default: ""
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isRecall: {
      type: Boolean,
      default: false,
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
