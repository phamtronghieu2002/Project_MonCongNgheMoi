import * as messageService from "../services/messageService.js";
export const handleCreateMessage = async (req, res) => {
  const { senderId, recieveId, content, isSeen, conversationId } = req.body;
  if (!senderId || !recieveId || !content || !isSeen || !conversationId) {
    return res.status(400).json({ message: "missing param" });
  }
  const response = await messageService.createMessage(
    senderId,
    recieveId,
    content,
    isSeen,
    conversationId
  );
  if (response) {
    return res.status(200).json(response);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
