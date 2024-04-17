import GroupModel from "../models/Group";
import UserModel from "../models/User";
import ConversationModal from "../models/Conversation";
import { generateKeywordsWithSpaces } from "../utils/user";
export const createGroup = async (
  groupName,
  groupPicture,
  members,
  createdBy
) => {
  try {
    const group = await GroupModel.create({
      groupName,
      groupPicture,
      members,
      createdBy,
      keywords: generateKeywordsWithSpaces(groupName),
    });

    const id_group = group._doc._id;
    for (let i = 0; i < members.length; i++) {
      await UserModel.findOneAndUpdate(
        { _id: members[i] },
        { $push: { groups: id_group } },
        { new: true }
      );
    }

    return group;
  } catch (error) {
    console.log(error);
  }
};


export const addUserToGroup = async (id_group, members) => {
  try {
    const group = await GroupModel.findByIdAndUpdate(
      { _id: id_group },
      { $push: { members: { $each: members } } },
      { new: true }
    );

    const groupid = group._doc._id;
    console.log(groupid);
    for (let i = 0; i < members.length; i++) {
      await UserModel.findOneAndUpdate(
        { _id: members[i] },
        { $push: { groups: groupid } },
        { new: true }
      );
      await ConversationModal.findOneAndUpdate(

        { members: { $in: [id_group] } },
        { $push: { members: members[i] } },
        { new: true }
      );

    }
    return group;
  } catch (error) {
    console.log(error);
  }
}

export const getGroupById = async (id) => {
  try {
    const group = await GroupModel.findById(id).populate('members', "_id username avatarPicture")
      .exec();;
    return group;
  } catch (error) {
    console.log(error);
  }
};