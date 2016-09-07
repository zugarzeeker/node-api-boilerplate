import { Router } from 'express';
import multer from 'multer';

const router = Router();
const LIMIT_10_MB = 1000 * 1000 * 10;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({
  storage: storage,
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

router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body);
  res.send('Upload Success');
});

export default router;
