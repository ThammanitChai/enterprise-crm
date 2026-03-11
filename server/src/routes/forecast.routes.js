import express from 'express';
import { getForecasts, upsertForecast } from '../controllers/forecast.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getForecasts);
router.post('/', restrictTo('admin'), upsertForecast);
export default router;