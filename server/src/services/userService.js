import UserModel from "../models/User";
import GroupModel from "../models/Group";
import dotenv from "dotenv";
import { hashPassword, comparePassword } from "..//utils/crypto";
import { create_access_token, create_fresh_token } from "../utils/jwt";
dotenv.config();

export const searchUser = async (keyword) => {
  try {
    const resultSearch = [];
    const users = await UserModel.find(
      {
        $or: [
          { keywords: { $in: keyword } },
          { phonenumber: `+84${keyword.slice(1)}` },
        ],
      },
      "_id avatarPicture username backgroundPicture friends"
    );
    if (users.length > 0) {
      resultSearch.push(...users.map((user) => ({ ...user._doc, isGroup: 0 })));
    }
    const groups = await GroupModel.find({
      keywords: { $in: keyword },
    });
    if (groups.length > 0) {
      resultSearch.push(...groups.map((group) => ({ ...group._doc, type: 1 })));
    }
    return resultSearch;
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await UserModel.findOne(
      { _id: id },
      "_id avatarPicture username ,friends"
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const checkFriend = async (senderId, friendId) => {

    const user = await UserModel.findOne({ _id: senderId });
  console.log(user._doc.friends.includes(friendId));
    return user._doc.friends.includes(friendId);

};

export const addFriend = async (senderId, friendId) => {
  try {
    const sender = await UserModel.findOneAndUpdate(
      { _id: senderId },
      { $push: { friends: friendId } },
      { new: true }
    );
    const friend = await UserModel.findOneAndUpdate(
      { _id: friendId },
      { $push: { friends: senderId } },
      { new: true }
    );
    return { sender, friend };
  } catch (error) {
    console.log(error);
  }
};
