import ConversationModel from "../models/Conversation.js";
import MessageModel from "../models/Message.js";
export const createConversation = async (senderid, recieveid, type) => {
  try {
    const conversation = await ConversationModel.findOne({
      members: { $all: [senderid, recieveid] },
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
    const consRes = [];
    console.log("conversation>>>",conversation);
    for(let i=0;i<conversation.length;i++){
      const message = await MessageModel.findOne({
        conversationId: conversation[i]._id.toString(),
      });
      console.log("message>>>",message);
      if (message) {
        consRes.push(conversation[i]);
        console.log("consRes trong>>>",consRes);
      }
    }

    console.log("consRes ngoai>>>",consRes);
    return consRes;
  } catch (error) {
    console.log(error);
  }
};
