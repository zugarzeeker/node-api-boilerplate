import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => {
  console.log('============');
  res.send('okkkk');
});

export default router;
