import * as express from 'express';
import v1API from './v1';

const router = express.Router();
router.use('/v1', v1API);

export default router;