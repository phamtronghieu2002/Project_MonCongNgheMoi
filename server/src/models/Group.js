const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
    },
     groupPicture: {
      type: String,
      default: "https://cdn4.iconfinder.com/data/icons/avatar-1-2/100/Avatar-16-512.png",
    },
    members: {
      type: Array,
      default: [],
    },
    keywords: {
      type: Array,
      default: [],
    },
    createdBy: {
        type: String,
        ref: "User",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", MessageSchema);
