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

    new_message.save();
    return await MessageModel.findOne({ _id: new_message._doc._id })
      .populate("senderId", "_id username avatarPicture")
      .exec();
  } catch (error) {
    console.log(error);
  }
};

export const updatStatusSeenMessage = async (senderid, conversationId,recieverid) => {
  try {

    console.log("recieverid >>>>>", recieverid);
    const resultUpdate = MessageModel.updateMany(
      {
        senderId: senderid,
        conversationId: conversationId,
     
      },
      { $addToSet: { isSeen: recieverid } }
    );

    return resultUpdate;
  } catch (error) {
    console.log(error);
  }
};

export const getMessageByConverationId = async (conversationId) => {
  console.log("conversationId>>", conversationId);
  try {
    const messages = await MessageModel.find({
      conversationId: conversationId,
    })
      .populate("senderId", "_id username avatarPicture")
      .exec();
    console.log("messages>>", messages);
    return messages;
  } catch (error) {
    console.log(error);
  }
};
