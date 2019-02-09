import * as express from 'express';
import * as uploadService from './uploadService';
const router = express.Router();

router.use(uploadService.getUpload());
router.post('/:path', uploadService.uploadFile);

export default router;
