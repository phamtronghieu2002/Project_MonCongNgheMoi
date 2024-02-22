import * as requestFriendService from "../services/requestFriendService";
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { senderId, recieverId } = req.body;
  if (!senderId || !recieverId) {
    return res.status(400).json({ message: "missing param" });
  }
  requestFriendService
    .addRequestFriend(senderId, recieverId)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get("/", async(req, res) => {
  const { senderId,recieverId } = req.query;
  console.log(senderId,recieverId);
  if(!senderId || !recieverId){
    return res.status(400).json({ message: "missing param" });
  }
    const request = await requestFriendService.checkSendRequestFriend( senderId,recieverId );
    if(request){
      return res.status(200).json(request);
    }
    return res.status(500).json({ message: "Internal Server Error" });

});
router.put("/:id", (req, res) => {
  const { status} = req.query;
 const { id } = req.params;

  requestFriendService
    .updateStatus(status,id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get("/:userId", async(req, res) => {
  const { userId } = req.params;
  if(!userId){
    return res.status(400).json({ message: "missing param" });
  }
    const request = await requestFriendService.getRequestFriend(userId);
    if(request){
      return res.status(200).json(request);
    }
    return res.status(500).json({ message: "Internal Server Error" });

});



export default router;