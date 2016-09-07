import { Router } from 'express';
import multer from 'multer';
import mime from 'mime';

const router = Router();
const LIMIT_10_MB = 1000 * 1000 * 10;
const ALLOW_FILE_TYPES = ['png', 'mp4', 'txt', 'mov', 'jpg', '3gp', 'avi'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
  }
});

const fileFilter = (req, res, next) => {
  if (ALLOW_FILE_TYPES.indexOf(mime.extension(req.file.mimetype)) !== -1) {
    next();
  }
  res.status(400).send('Error file type');
};
const upload = multer({
  storage,
  limits: {
    fileSize: LIMIT_10_MB,
    files: 1
    // fields: 2
  }
});
router.get('/', (req, res) => {
  console.log('============');
  res.send('okkkk');
});

router.post('/upload', upload.single('file'), fileFilter, (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send('Upload Success');
});

export default router;
