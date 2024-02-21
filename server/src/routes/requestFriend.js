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
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});
router.put("/", (req, res) => {
  const { status} = req.query;
 const { senderId, recieverId } = req.body;
  requestFriendService
    .updateStatus(status,senderId,recieverId)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});


export default router;