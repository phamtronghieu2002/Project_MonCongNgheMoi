import MessageModel from "../models/Message.js";
export const createMessage = async (
  senderid,

  content,
  conversationId
) => {
  try {
    const new_message = new MessageModel({
      senderId: senderid,

      content: content,
      isSeen: 0,
      conversationId: conversationId,
    });
    console.log("new_message>>", new_message)
    new_message.save();
    return new_message;
  } catch (error) {
    console.log(error);
  }
};

export const updatStatusSeenMessage = async (
  senderid,

  conversationId
) => {
  try {
    const resultUpdate = MessageModel.updateMany({
      senderId: senderid,
      conversationId: conversationId,
      isSeen: 0,
    }, { isSeen: 1 });
  
    
    return resultUpdate;
  } catch (error) {
    console.log(error);
  }
};

export const getMessageByConverationId = async (
    conversationId
  ) => {
    console.log("conversationId>>", conversationId)
    try {
      const messages = await MessageModel.find({
        conversationId: conversationId,
      });
      console.log("messages>>", messages)
      return messages;
    } catch (error) {
      console.log(error);
    }
  };
  