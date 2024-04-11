import express from 'express';
const router = express.Router();
import * as messageController from '../controllers/messageController.js';
import { uploadImage } from '../middlewares/uploadImage.js';
import uploadFile from '../middlewares/uploadFile.js';

router.post("/", messageController.handleCreateMessage);
router.post("/uploadImage", uploadImage.single("file"), messageController.uploadImageMessage);
router.post("/uploadFile", uploadFile.single("file"), messageController.uploadFileMessage);
router.get("/:conversationId", messageController.handleGetMessageByConverationId);
router.post("/updateStatus", messageController.handleUpdateStatusSeenMessage);
router.put("/updateReaction", messageController.handleUpdateReactionMessage);
router.delete("/:id", messageController.handleDeleteMessage);
export default router;