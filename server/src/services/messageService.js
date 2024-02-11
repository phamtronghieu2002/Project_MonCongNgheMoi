import MessageModel from "../models/Message.js";
export const createMessage = async (
  senderid,
  recieveid,
  content,
  isSeen,
  conversationId
) => {
  try {
    const new_message = new MessageModel({
      senderId: senderid,
      recieveId: recieveid,
      content: content,
      isSeen: isSeen,
      conversationId: conversationId,
    });
    new_message.save();
    return new_message;
  } catch (error) {
    console.log(error);
  }
};
