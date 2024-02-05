const mongoose = require("mongoose");

const RequestFriend = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    recieveId: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [0,1,2],
    },
  }
,
  { timestamps: true }
);

module.exports = mongoose.model("RequestFriend", RequestFriend);
