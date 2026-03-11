import express from 'express';
import { createProject, getProjects } from '../controllers/project.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();
router.use(protect);
router.route('/').get(getProjects).post(upload.array('attachments', 10), createProject);
export default router;