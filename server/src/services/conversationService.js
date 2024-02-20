import ConversationModel from "../models/Conversation.js";

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


    const conversations = await ConversationModel.find({
      members: { $in: [senderid] },
    }).sort({ updatedAt: -1});
    const consRes = [];
    if (conversations.length === 0) {
      return conversations;
    }

   
    //check if conversation has message
    for (let i = 0; i < conversations.length; i++) {
   

      if (conversations[i].lastMessage !== "") {
        consRes.push(conversations[i]);
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
  {
    $set: {
      lastMessage: lastMessage,
    },
    $currentDate: {
      updatedAt: true,
    },
  },
  { new: true }
);

// Now, let's sort conversations based on updatedAt field
const sortedConversations = await ConversationModel.find().sort({ updatedAt: -1 });

return sortedConversations;
  } catch (error) {
    console.log(error);
  }
};
