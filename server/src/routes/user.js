import express from 'express';
const router = express.Router();
import * as userControler from '../controllers/userController';

router.get("/search", userControler.handleSearchUser);




export default router;