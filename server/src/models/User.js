const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
      max: 11,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    avatarPicture: {
      type: String,
      default: "",
    },
    backgroundPicure: {
      type: String,
      default: "",
    },
    gender: {
      type: Number,
      enum: [0, 1],
    },
    birth: {
      type: Date,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    groups: {
      type: Array,
      default: [],
    },
    keywords: {
      type: Array,
      default: [],
    },
    freshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
