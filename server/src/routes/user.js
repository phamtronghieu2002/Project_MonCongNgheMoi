import express from 'express';
const router = express.Router();
dotenv.config();
const cloudinary = require('cloudinary').v2;
import dotenv from 'dotenv';
import * as userControler from '../controllers/userController';
import multer from "multer";

const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.DINARY_CLOUD_NAME,
    api_key: process.env.DINARY_CLOUD_API_KEY,
    api_secret: process.env.DINARY_CLOUD_API_SECRET
});

// Cấu hình lưu trữ ảnh trên Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Extract file extension
        const fileExt = file.originalname.split('.').pop();
        return {
            folder: 'zaloclone',
            format: fileExt,
            public_id: `${Date.now()}-${file.originalname}`
        };
    }
});

// Tạo middleware upload sử dụng multer và cloudinary storage
const upload = multer({ storage: storage });


router.get("/search", userControler.handleSearchUser);
router.get("/firstCharacter", userControler.handleGetUserByFirstCharater);
router.get("/:id", userControler.handleGetUserById);
router.post("/checkFriend", userControler.handleCheckFriend);
router.post("/addFriend", userControler.handleAddFriend);
router.put("/:id", userControler.handleUpdateInformationUser);
router.put("/updateAvatar/:id", upload.single('file'), userControler.handleUpdateImageUser);
export default router;  