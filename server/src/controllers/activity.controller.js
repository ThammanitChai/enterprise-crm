import Activity from '../models/Activity.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';
import { catchAsync } from '../utils/catchAsync.js';
import { getIO } from '../config/socket.js';

const computeStatus = (followUpDate) => {
  if (!followUpDate) return 'completed';
  const now = new Date();
  const target = new Date(followUpDate);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  if (target < todayStart) return 'overdue';
  if (target >= todayStart && target < tomorrowStart) return 'today';
  return 'upcoming';
};

export const createActivity = catchAsync(async (req, res) => {
    const images = req.files?.map((f) => f.path) || [];
    const activity = await Activity.create({
      customer: req.body.customer,
      project: req.body.project || null,
      type: req.body.type || 'call',
      direction: req.body.direction || 'outbound',
      description: req.body.description,
      images,
      hotness: Number(req.body.hotness || 3),
      followUpDate: req.body.followUpDate || null,
      followUpChannel: req.body.followUpChannel || '',
      nextActionNote: req.body.nextActionNote || '',
      assignedTo: req.body.assignedTo || req.user._id,
      createdBy: req.user._id,
      status: computeStatus(req.body.followUpDate)
    });
  
    await AuditLog.create({
      actor: req.user._id,
      action: 'CREATE_ACTIVITY',
      entityType: 'Activity',
      entityId: activity._id.toString(),
      detail: { customer: activity.customer }
    });
  
    const admins = await User.find({ role: 'admin', isActive: true });
    if (admins.length) {
      await Notification.insertMany(
        admins.map((a) => ({
          user: a._id,
          title: 'Activity updated',
          message: `${req.user.fullName} created a new activity`,
          type: 'update',
          meta: { activityId: activity._id }
        }))
      );
    }
  
    const io = getIO();
    if (io) io.emit('activity:new', activity);
  
    res.status(201).json({ success: true, data: activity });
  });
  
  export const getActivities = catchAsync(async (req, res) => {
    const { status, assignedTo, customer } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (customer) filter.customer = customer;
  
    const activities = await Activity.find(filter)
      .populate('customer', 'companyName customerCode')
      .populate('assignedTo', 'fullName')
      .populate('createdBy', 'fullName')
      .sort({ createdAt: -1 });
  
    res.json({ success: true, data: activities });
  });