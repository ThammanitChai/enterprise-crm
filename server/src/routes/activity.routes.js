import express from 'express';
import { createActivity, getActivities } from '../controllers/activity.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getActivities).post(upload.array('images', 5), createActivity);

export default router;