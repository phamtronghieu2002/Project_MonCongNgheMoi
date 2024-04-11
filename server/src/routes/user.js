import express from 'express';
const router = express.Router();
dotenv.config();
import dotenv from 'dotenv';
import * as userControler from '../controllers/userController';
import { uploadImage } from '../middlewares/uploadImage';

// Tạo middleware upload sử dụng multer và cloudinary storage



router.get("/search/:id", userControler.handleSearchUser);
router.get("/firstCharacter", userControler.handleGetUserByFirstCharater);
router.get("/:id", userControler.handleGetUserById);
router.post("/checkFriend", userControler.handleCheckFriend);
router.post("/addFriend", userControler.handleAddFriend);
router.put("/:id", userControler.handleUpdateInformationUser);
router.put("/updateAvatar/:id", uploadImage.single('file'), async (req, res) => {


    const _id = req.params.id;
    const imgURL = req.file.path;
    if (!imgURL) {
        return res.status(400).json({ message: "missing param" });
    }
    const data = await userServices.updateImageUser(_id, imgURL);
    if (data) {
        return res.status(200).json(data);
    }
    return res.status(500).json({ message: "Internal Server Error" });
});
export default router;  