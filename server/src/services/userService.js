import UserModel from "../models/User";
import GroupModel from "../models/Group";
import dotenv from "dotenv";
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
export const getUserByFirstCharater = async () => {
  try {
    const users = await UserModel.find(
      {},
      "_id username avatarPicture phonenumber"
    ).sort({ username: 1 });
    console.log("users>>", users);
    const result = [];
    let currentLetter = null;
    let currentGroup = null;

    users.forEach((user) => {
      console.log("user>>", user)
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
