import express from 'express';
const router = express.Router();
import * as groupControler from '../controllers/groupController';

router.post("/", groupControler.handleCreateGroup);   
router.get("/:id", groupControler.handleGetGroupById);   
export default router;