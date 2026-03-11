import Notification from '../models/Notification.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getMyNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: notifications });
});

export const markAsRead = catchAsync(async (req, res) => {
  const notification = await Notification.findOne({ _id: req.params.id, user: req.user._id });
  if (!notification) {
    return res.status(404).json({ success: false, message: 'Notification not found' });
  }
  notification.isRead = true;
  await notification.save();
  res.json({ success: true, data: notification });
});