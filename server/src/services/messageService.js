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
    const currentDateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }); // Adjust time zone as needed
    new_message.createdAt = currentDateTime;
    await new_message.save();

    const result = await MessageModel.findOne({ _id: new_message._doc._id })
      .populate("senderId", "_id username avatarPicture")
      .exec();

    return result

  } catch (error) {
    console.log(error);
  }
};

export const updatStatusSeenMessage = async (senderid, conversationId, recieverid) => {
  try {

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
  try {
    const messages = await MessageModel.find({
      conversationId: conversationId,
    })
      .populate("senderId", "_id username avatarPicture")
      .exec();
    return messages;
  } catch (error) {
    console.log(error);
  }
};
