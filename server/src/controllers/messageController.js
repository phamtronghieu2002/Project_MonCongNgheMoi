import * as messageService from "../services/messageService.js";
export const handleCreateMessage = async (req, res) => {
  const { senderId, content, conversationId } = req.body;
  console.log("type", typeof (content));
  if (!senderId || !content || !conversationId) {
    return res.status(400).json({ message: "missing param" });
  }

  const data = await messageService.createMessage(
    senderId,

    content,
    conversationId
  );
  console.log("data>>>", data);
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