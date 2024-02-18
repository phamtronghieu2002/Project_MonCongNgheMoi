import * as conversationService from '../services/conversationService';
export const handleCreateConversation = async (req, res) => {
    const  {senderid,recieverid,type} = req.body;
    if (!senderid || !recieverid) {
      return res.status(400).json({ message: "missing param" });
    }
    const response = await conversationService.createConversation(senderid, recieverid, type);
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  
    }


    export const handleGetConversation = async (req, res) => {
      const  {senderid} = req.params;
      if (!senderid ) {
        return res.status(400).json({ message: "missing param" });
      }
      const response = await conversationService.getConversationByUserId(senderid);
      if (response) {
        return res.status(200).json(response);
      }
      return res.status(500).json({ message: "Internal Server Error" });
    
      }

      export const handleUpdateLastMessage = async (req, res) => {
  
        const {conversationId} = req.params;
        const {lastMessage} =req.query
        if (!conversationId || !lastMessage) {
          return res.status(400).json({ message: "missing param" });  
        }
        const response = await conversationService.updateLastMessage(conversationId,lastMessage);
        if (response) {
          return res.status(200).json(response);
        }
        return res.status(500).json({ message: "Internal Server Error" });
      
        }