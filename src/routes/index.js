import { Router } from 'express'
const router = Router();

import sample from './sample';

router.use('/sample', sample);

export default router;
