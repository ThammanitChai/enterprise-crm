import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});

export const updateUserRole = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  user.role = req.body.role;
  user.department = req.body.department ?? user.department;
  user.isActive = req.body.isActive ?? user.isActive;
  await user.save();

  await AuditLog.create({
    actor: req.user._id,
    action: 'UPDATE_USER',
    entityType: 'User',
    entityId: user._id.toString(),
    detail: { role: user.role, department: user.department, isActive: user.isActive }
  });

  res.json({ success: true, data: user });
});

export const getAuditLogs = catchAsync(async (req, res) => {
  const logs = await AuditLog.find()
    .populate('actor', 'fullName username role')
    .sort({ createdAt: -1 })
    .limit(200);
  res.json({ success: true, data: logs });
});