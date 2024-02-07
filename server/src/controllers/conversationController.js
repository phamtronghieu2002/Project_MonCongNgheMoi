import * as conversationService from '../services/conversationService';
export const handleCreateConversation = async (req, res) => {
    const  {senderid,recieveid,type} = req.body;
    if (!senderid || !recieveid) {
      return res.status(400).json({ message: "missing param" });
    }
    const response = await conversationService.createConversation(senderid, recieveid, type);
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
      const response = await conversationService.getConversationById(senderid);
      if (response) {
        return res.status(200).json(response);
      }
      return res.status(500).json({ message: "Internal Server Error" });
    
      }