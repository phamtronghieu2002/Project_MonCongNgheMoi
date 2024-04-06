import express from 'express';
const router = express.Router();
dotenv.config();
import dotenv from 'dotenv';
import * as userControler from '../controllers/userController';
import { upload } from '../utils/uploadImageUtil';


// Tạo middleware upload sử dụng multer và cloudinary storage



router.get("/search", userControler.handleSearchUser);
router.get("/firstCharacter", userControler.handleGetUserByFirstCharater);
router.get("/:id", userControler.handleGetUserById);
router.post("/checkFriend", userControler.handleCheckFriend);
router.post("/addFriend", userControler.handleAddFriend);
router.put("/:id", userControler.handleUpdateInformationUser);
router.put("/updateAvatar/:id", upload.single('file'), userControler.handleUpdateImageUser);
export default router;  