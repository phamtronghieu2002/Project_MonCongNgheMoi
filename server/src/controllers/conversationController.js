import * as conversationService from '../services/conversationService';
export const handleCreateConversation = async (req, res) => {
  const { senderid, recieverid, type } = req.body;
  if (!senderid || !recieverid) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await conversationService.createConversation(senderid, recieverid, type);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });

}


export const handleGetConversation = async (req, res) => {
  const { senderid } = req.params;
  if (!senderid) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await conversationService.getConversationByUserId(senderid);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });

}

export const handleUpdateLastMessage = async (req, res) => {

  const { conversationId } = req.params;
  const { lastMessage } = req.query
  const { senderid } = req.query
  if (!conversationId || !lastMessage || !senderid) {
    return res.status(400).json({ message: "missing param" });
  }
  const data = await conversationService.updateLastMessage(conversationId, lastMessage, senderid);
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Internal Server Error" });

}