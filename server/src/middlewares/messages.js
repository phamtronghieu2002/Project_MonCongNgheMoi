import { upload } from '../utils/uploadImageUtil.js';
 function checkTypeMessage(req, res, next) {
    // Kiểm tra query parameters từ URL
    const isTextMesage = req.query.type === 'text';
    console.log("isTextMesage>>>", isTextMesage);
    if(isTextMesage){
  return   next();
    }
    upload.single('file')(); 
   
  };

  export { checkTypeMessage };