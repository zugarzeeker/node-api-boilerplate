import { Router } from 'express';
import { singleUpload } from '../middlewares/multer-uploader';

const router = Router();

router.get('/', (req, res) => {
  console.log('============');
  res.send('okkkk');
});

router.post('/upload', singleUpload, (req, res) => {
  res.send('Upload Success');
});

export default router;
