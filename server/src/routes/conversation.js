import express from "express";
const router = express.Router();
import * as conversationController from "../controllers/conversationController.js";
router.post("/",conversationController.handleCreateConversation);
router.get("/:senderid",conversationController.handleGetConversation);




export default router;