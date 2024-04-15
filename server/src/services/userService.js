import UserModel from "../models/User";
import GroupModel from "../models/Group";
import dotenv from "dotenv";
import { checkPhoneNumberIsValid } from "../utils/user";
dotenv.config();

export const searchUser = async (userId, keyword) => {
  try {
    const resultSearch = [];
    const user = await UserModel.findOne({ _id: userId });

    console.log("user id", user._doc._id);
    const userFriends = user._doc.friends;
    const userGroups = user._doc.groups;

    const isPhoneNumber = checkPhoneNumberIsValid(keyword);
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
      if (isPhoneNumber) {

        resultSearch.push(...users.map((user) => ({ ...user._doc, isGroup: 0 })));
      } else {
        userFriends.forEach((friendid) => {
          users.forEach((user) => {
            console.log("user._id", user._id.toString(), friendid);
            console.log(user.backgroundPicture);
            if (user._id.toString() === friendid) {
              console.log("ok");
              resultSearch.push({ ...user._doc, isGroup: 0 });
            }
          });
        });
      }

    }
    const groups = await GroupModel.find({
      keywords: { $in: keyword },
    });
    if (groups.length > 0) {
      userGroups.forEach((groupid) => {
        groups.forEach((group) => {
          if (group._id.toString() === groupid) {
            resultSearch.push({ ...group._doc, isGroup: 1 });
          }
        });
      });
    }
    return resultSearch;
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await UserModel.findOne(
      { _id: id }, {
      password: 0,
    }

    )
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const checkFriend = async (senderId, friendId) => {
  const user = await UserModel.findOne({ _id: senderId });
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


export const getUserByFirstCharater = async (userId) => {
  try {
    const users = await UserModel.find(
      {
      //  friends: { $in: [userId] }
      },
      "_id username avatarPicture phonenumber groups"
    ).sort({ username: 1 });
 


    const result = [];
    let currentLetter = null;
    let currentGroup = null;

    users.forEach((user) => {
    
      const firstLetter = user.username[0].toUpperCase();

      if (firstLetter !== currentLetter) {
        if (currentGroup) {
          result.push(currentGroup);
        }
        currentLetter = firstLetter;
        currentGroup = {
          firstKey: currentLetter,
          users: [],
        };
      }

      currentGroup.users.push(user);
    });

    if (currentGroup) {
      result.push(currentGroup);
    }

    console.log("result>>", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (_id, username, gender, birth) => {
  try {

    //exclude password
    const user = await UserModel
      .findOneAndUpdate({ _id },
        {
          $set: {
            username,
            gender,
            birth
          }
        },
        { new: true, fields: { password: 0 } }
      );
    return user;
  } catch (error) {
    console.log(error);
  }
}
export const updateImageUser = async (_id, imgURL) => {
  try {

    //exclude password
    const user = await UserModel
      .findOneAndUpdate({ _id },
        {
          $set: {
            avatarPicture: imgURL
          }
        },
        { new: true, fields: { password: 0 } }
      );
    return user;
  } catch (error) {
    console.log(error);
  }
}
