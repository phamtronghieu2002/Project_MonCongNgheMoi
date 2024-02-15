import * as messageService from "../services/messageService.js";
export const handleCreateMessage = async (req, res) => {
  const { senderId, recieverId, content, conversationId } = req.body;
  if (!senderId || !recieverId || !content  || !conversationId) {
    return res.status(400).json({ message: "missing param" });
  }

  const response = await messageService.createMessage(
    senderId,
    recieverId,
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
