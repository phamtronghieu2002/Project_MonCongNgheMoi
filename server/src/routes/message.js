import express from 'express';
const router=express.Router();
import * as messageController from '../controllers/messageController.js';
router.post("/", messageController.handleCreateMessage);
router.get("/:conversationId", messageController.handleGetMessageByConverationId);

export default router;