const mongoose = require("mongoose");

const RequestFriend = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
      ref: "User",
    },
    recieverId: {
      type: String,
      required: true,
      ref: "User",
    },
    status: {
      type: Number,
      enum: [0,1,2,3],
      // 0: huy ket ban
      // 1: dang cho
      // 2: đã từ chối
      // 3: đã kết bạn

    },
  }
,
  { timestamps: true }
);

module.exports = mongoose.model("RequestFriend", RequestFriend);
