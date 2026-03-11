import Customer from '../models/Customer.js';
import Activity from '../models/Activity.js';
import Project from '../models/Project.js';
import SalesForecast from '../models/SalesForecast.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getDashboardSummary = catchAsync(async (req, res) => {
  const [totalCustomers, totalActivities, totalProjects, overdueActivities, todayActivities, forecasts] = await Promise.all([
    Customer.countDocuments(),
    Activity.countDocuments(),
    Project.countDocuments(),
    Activity.countDocuments({ status: 'overdue' }),
    Activity.countDocuments({ status: 'today' }),
    SalesForecast.find().sort({ year: -1, month: -1 }).limit(12)
  ]);

  res.json({
    success: true,
    data: {
      totalCustomers,
      totalActivities,
      totalProjects,
      overdueActivities,
      todayActivities,
      latestForecasts: forecasts
    }
  });
});