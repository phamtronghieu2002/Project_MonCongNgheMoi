const mongoose = require("mongoose");
const MediaSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
     mediatype: {
        type:Number,
        required: true,
        enum: [0,1,2],
    },
    senderId: {
      type: Array,
      default: [],
    },
    content: {
        type: String,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", MediaSchema);
