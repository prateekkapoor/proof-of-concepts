import * as express from 'express';
import uploadController from '../../../upload/uploadController'

const router = express.Router();

router.use('/upload', uploadController);

export default router;
