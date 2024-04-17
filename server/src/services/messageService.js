import MessageModel from "../models/Message.js";
export const createMessage = async (
  senderId,
  content,
  conversationId,
  type
) => {
  try {
    const new_message = new MessageModel({
      senderId,
      content,
      isSeen: 0,
      conversationId,
      type
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

export const updateReactionMessage = async (messageId, reaction) => {
  try {
    const messages = await MessageModel.findByIdAndUpdate({
      _id: messageId
    }, {
      reaction
    }, { new: true })

    return messages;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (id) => {
  try {
    const message = await MessageModel.findByIdAndUpdate({
      _id: id
    }, {
      isDeleted: true
    }, {
      new: true
    });
    return message;
  }
  catch (error) {
    console.log(error);
  }
}

export const recallMessage = async (id) => {
  try {
    const message = await MessageModel
      .findByIdAndUpdate({ _id: id }, { isRecall: true }, { new: true })
    return message;
  }
  catch (error) {
    console.log(error);
  }
}
