import express from 'express';
import { getAuditLogs, getUsers, updateUserRole } from '../controllers/user.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(protect, restrictTo('admin'));
router.get('/', getUsers);
router.patch('/:id', updateUserRole);
router.get('/audit/logs', getAuditLogs);
export default router;