import * as messageService from "../services/messageService.js";
export const handleCreateMessage = async (req, res) => {
  const { senderId, content, conversationId } = req.body;
  const {typeMessages}=req.query;
  const imgURL = req.file?.path;
  if (!senderId || !content || !conversationId ||typeMessages) {
    return res.status(400).json({ message: "missing param or query" });
  }
  let data;
  data= await messageService.createMessage(
    senderId,
    content,
    conversationId,
    imgURL,
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