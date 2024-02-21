const mongoose = require("mongoose");

const RequestFriend = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [0,1,2],
      // 0: huy ket ban
      // 1: dang cho
      // 2: đã từ chối

    },
  }
,
  { timestamps: true }
);

module.exports = mongoose.model("RequestFriend", RequestFriend);
