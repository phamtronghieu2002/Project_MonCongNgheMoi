import GroupModel from "../models/Group";
import UserModel from "../models/User";

import {generateKeywordsWithSpaces} from "../utils/user";
export const createGroup = async (
  groupName,
  groupPicture,
  members,
  createdBy
) => {
  try {
    const group = await  GroupModel.create({
      groupName,
      groupPicture,
      members,
      createdBy,
      keywords: generateKeywordsWithSpaces(groupName),
    });

    const id_group=group._doc._id;
    for(let i=0;i<members.length;i++){
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
export const getGroupById = async (id) => {
  try {
    const group = await GroupModel.findById(id);
    return group;
  } catch (error) {
    console.log(error);
  }
};