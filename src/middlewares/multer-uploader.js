import multer from 'multer';
import mime from 'mime';

const LIMIT_10_MB = 1000 * 1000 * 10;
const ALLOW_FILE_TYPES = ['png', 'mp4', 'txt', 'mov', 'jpg', '3gp', 'avi'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
  }
});

const fileFilter = (req, res, next) => {
  if (ALLOW_FILE_TYPES.indexOf(mime.extension(req.file.mimetype)) !== -1) {
    return next();
  }
  return res.status(400).send('Error file type');
};
const upload = multer({
  storage,
  limits: {
    fileSize: LIMIT_10_MB,
    files: 1
    // fields: 2
  }
});

export const singleUpload = [upload.single('file'), fileFilter];
