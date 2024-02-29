import GroupModel from "../models/Group";
import {generateKeywordsWithSpaces} from "../utils/user";
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