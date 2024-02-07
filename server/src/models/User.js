const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    phonenumber: {
      type: String,
      required: true,
      max: 11,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    avatarPicture: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQXtLutHYPumK-y3M4mrBbupa3O3foGz0WcMc-oMu80A&s",
    },
    backgroundPicture: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dKSyQWsTU7VPPyYFifkT_L7N7VCjbO8aIA&usqp=CAU",
    },
    gender: {
      type: Number,
      enum: [0, 1],
      default: 0,
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
