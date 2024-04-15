import express from 'express';
const router = express.Router();
dotenv.config();
import dotenv from 'dotenv';
import * as userController from '../controllers/userController';
import { uploadImage } from '../middlewares/uploadImage';

// Tạo middleware upload sử dụng multer và cloudinary storage



router.get("/search/:id", userController.handleSearchUser);
router.get("/firstCharacter/:id", userController.handleGetUserByFirstCharater);
router.get("/:id", userController.handleGetUserById);
router.post("/checkFriend", userController.handleCheckFriend);
router.post("/addFriend", userController.handleAddFriend);
router.put("/:id", userController.handleUpdateInformationUser);
router.put("/updateAvatar/:id", uploadImage.single('file'), userController.handleUpdateImageUser);
export default router;  