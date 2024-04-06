import express from 'express';
const router=express.Router();
import * as messageController from '../controllers/messageController.js';
import {checkTypeMessage} from '../middlewares/messages.js';

router.post("/",checkTypeMessage, messageController.handleCreateMessage);
router.get("/:conversationId", messageController.handleGetMessageByConverationId);
router.post("/updateStatus", messageController.handleUpdateStatusSeenMessage);

export default router;