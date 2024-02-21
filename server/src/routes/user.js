import express from 'express';
const router = express.Router();
import * as userControler from '../controllers/userController';

router.get("/search", userControler.handleSearchUser);
router.get("/:id", userControler.handleGetUserById);
router.post("/checkFriend", userControler.handleCheckFriend);


export default router;