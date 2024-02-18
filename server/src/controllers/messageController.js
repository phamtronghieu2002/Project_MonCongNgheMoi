import * as messageService from "../services/messageService.js";
export const handleCreateMessage = async (req, res) => {
  const { senderId, content, conversationId } = req.body;
  if (!senderId  || !content  || !conversationId) {
    return res.status(400).json({ message: "missing param" });
  }

  const response = await messageService.createMessage(
    senderId,

    content,
    conversationId
  );
  if (response) {
    return res.status(200).json(response);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleGetMessageByConverationId = async (req, res) => {
  const { conversationId } = req.params;
  console.log("req.params>>>", req.params);
  if (!conversationId) {
    return res.status(400).json({ message: "missing param" });
  }
  const response = await messageService.getMessageByConverationId(
    conversationId
  );
  if (response) {
    return res.status(200).json(response);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleUpdateStatusSeenMessage = async (req, res) => {
  const { senderId, conversationId } = req.body;
  if (!senderId || !conversationId) {
    return res.status(400).json({ message: "missing param" });
  }
  const response = await messageService.updatStatusSeenMessage(
    senderId,
    conversationId
  );
  if (response) {
    return res.status(200).json(response);
  }
  return res.status(500).json({ message: "Internal Server Error" });
}