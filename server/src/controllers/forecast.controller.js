import SalesForecast from '../models/SalesForecast.js';
import { catchAsync } from '../utils/catchAsync.js';

export const upsertForecast = catchAsync(async (req, res) => {
  const payload = {
    month: Number(req.body.month),
    year: Number(req.body.year),
    level: req.body.level,
    targetAmount: Number(req.body.targetAmount || 0),
    actualSales: Number(req.body.actualSales || 0),
    forecastNew: Number(req.body.forecastNew || 0),
    backlogForecast: Number(req.body.backlogForecast || 0),
    teamName: req.body.teamName || '',
    user: req.body.user || null,
    updatedBy: req.user._id
  };

  const forecast = await SalesForecast.findOneAndUpdate(
    {
      month: payload.month,
      year: payload.year,
      level: payload.level,
      teamName: payload.teamName,
      user: payload.user
    },
    payload,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json({ success: true, data: forecast });
});

export const getForecasts = catchAsync(async (req, res) => {
  const forecasts = await SalesForecast.find()
    .populate('user', 'fullName department')
    .populate('updatedBy', 'fullName')
    .sort({ year: -1, month: -1 });

  res.json({ success: true, data: forecasts });
});