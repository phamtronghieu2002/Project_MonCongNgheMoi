import express from "express";
const router = express.Router();
import * as messageController from "../controllers/messageController.js";
import { uploadImage } from "../middlewares/uploadImage.js";
import uploadFile from "../middlewares/uploadFile.js";
const cloudinary = require("cloudinary").v2;

router.post("/", messageController.handleCreateMessage);
router.post(
  "/uploadImage",
  uploadImage.single("file"),
  messageController.uploadImageMessage
);
router.post(
  "/uploadImageMobile",
  uploadImage.single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
      });
      return res.status(200).json({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err });
    }
  }
);
router.post(
  "/uploadFile",
  uploadFile.single("file"),
  messageController.uploadFileMessage
);
router.get(
  "/:conversationId",
  messageController.handleGetMessageByConverationId
);
router.post("/updateStatus", messageController.handleUpdateStatusSeenMessage);
router.put("/updateReaction", messageController.handleUpdateReactionMessage);
router.delete("/:id", messageController.handleDeleteMessage);
router.delete("/recall/:id", messageController.handleRecallMessage);
export default router;
