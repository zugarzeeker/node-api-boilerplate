import { Router } from 'express';
import { singleUpload, multipleUpload } from '../middlewares/multer-uploader';

const router = Router();

router.get('/', (req, res) => {
  console.log('============');
  res.send('okkkk');
});

router.post('/upload', singleUpload, (req, res) => {
  res.send(req.file);
});

router.post('/upload-multiple', multipleUpload, (req, res) => {
  res.send(req.files);
});

export default router;
