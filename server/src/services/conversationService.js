import ConversationModel from "../models/Conversation.js";
import MessageModel from "../models/Message.js";
export const createConversation = async (senderid, recieverid, type) => {
  try {
    const conversation = await ConversationModel.findOne({
      members: { $all: [senderid, recieverid] },
      isGroup: type,
    });
    if (conversation) {
      return conversation;
    }
    const new_conversation = new ConversationModel({
      members: [senderid, recieverid],
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
export const getConversationByUserId = async (senderid) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [senderid] },
    });
    const consRes = [];
    if (conversation.length === 0) {
      return conversation;
    }
    //check if conversation has message
    for (let i = 0; i < conversation.length; i++) {
      const message = await MessageModel.findOne({
        conversationId: conversation[i]._id.toString(),
      });

      if (message) {
        consRes.push(conversation[i]);
        console.log("consRes trong>>>", consRes);
      }
    }

    return consRes;
  } catch (error) {
    console.log(error);
  }
};

export const updateLastMessage = async (conversationId, lastMessage) => {
  try {
//update and sort by updateAt
    const updatedConversation = await ConversationModel.findByIdAndUpdate(
      conversationId,
      { lastMessage: lastMessage },
      { new: true }
    );


 

    return updatedConversation;
  } catch (error) {
    console.log(error);
  }
};
