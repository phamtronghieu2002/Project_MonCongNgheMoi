import * as messageService from "../services/messageService.js";



export const uploadImageMessage = async (req, res) => {

  const imgURL = req.file.path;
  if (imgURL) {
    return res.status(200).json({ imgURL });
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

export const handleCreateMessage = async (req, res) => {
  const { senderId, content, conversationId } = req.body;
  console.log("req.body>>>", req.query);
  const typeMessages = req.query.type;

  if (!senderId || !content || !conversationId || !typeMessages) {
    return res.status(400).json({ message: "missing param or query" });
  }
  let data;
  data = await messageService.createMessage(
    senderId,
    content,
    conversationId,
    typeMessages
  );

  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleGetMessageByConverationId = async (req, res) => {
  const { conversationId } = req.params;
  console.log("req.params>>>", req.params);
  if (!conversationId) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await messageService.getMessageByConverationId(
    conversationId
  );
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleUpdateStatusSeenMessage = async (req, res) => {
  const { senderId, conversationId, receiverId } = req.body;
  if (!senderId || !conversationId || !receiverId) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await messageService.updatStatusSeenMessage(
    senderId,
    conversationId,
    receiverId
  );
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

export const uploadFileMessage = async (req, res) => {


  const fileName = req.file.filename;
  const file_size = (req.file.size) / (1024 * 1000);
  console.log("req.file>>>", req.file);
  if (fileName) {
    return res.status(200).json({ fileName: fileName + "/" + file_size.toFixed(2) + "mb" });
  }



  return res.status(500).json({ message: "Internal Server Error" });
}

export const handleUpdateReactionMessage = async (req, res) => {
  const { messageId, emoji } = req.body;
  if (!messageId || !emoji) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await messageService.updateReactionMessage(
    messageId,
    emoji
  );
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
}