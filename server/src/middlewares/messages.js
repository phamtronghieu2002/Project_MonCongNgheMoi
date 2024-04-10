import { upload } from '../utils/uploadImageUtil.js';
function checkTypeMessage(req, res, next) {
  // Kiểm tra query parameters từ URL
  const isTextMesage = req.query.type === 'text';
  if (isTextMesage) {
    return next();
  }
  upload.single('file')(req, res, next);

};

export { checkTypeMessage };