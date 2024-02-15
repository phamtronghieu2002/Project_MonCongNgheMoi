import MessageModel from "../models/Message.js";
export const createMessage = async (
  senderid,
  recieverid,
  content,

  conversationId
) => {
  try {
    const new_message = new MessageModel({
      senderId: senderid,
      recieverId: recieverid,
      content: content,
      isSeen: 0,
      conversationId: conversationId,
    });
    new_message.save();
    return new_message;
  } catch (error) {
    console.log(error);
  }
};


export const getMessageByConverationId = async (
    conversationId
  ) => {
    
    try {
      const messages = await MessageModel.find({
        conversationId: conversationId,
      });
      return messages;
    } catch (error) {
      console.log(error);
    }
  };
  