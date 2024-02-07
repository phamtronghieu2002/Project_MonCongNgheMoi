import ConversationModel from "../models/Conversation.js";
export const createConversation = async (senderid, recieveid, type) => {
  try {
    const conversation = await ConversationModel.findOne({
      members: { $in: [senderid, recieveid] },
      isGroup: type,
    });
    if (conversation) {
      return conversation;
    }
    const new_conversation = new ConversationModel({
      members: [senderid, recieveid],
      isGroup: type,
    });
    const response = await new_conversation.save();
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getConversationById = async (senderid) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [senderid] },
    });
    if (conversation) {
      return conversation;
    }
  } catch (error) {
    console.log(error);
  }
};
