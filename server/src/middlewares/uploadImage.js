const cloudinary = require('cloudinary').v2;

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

const uploadImage = multer({ storage: storage });
export { uploadImage }
