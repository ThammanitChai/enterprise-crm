import User from '../models/User.js';
import { signToken } from '../utils/token.js';
import { catchAsync } from '../utils/catchAsync.js';

export const register = catchAsync(async (req, res) => {
  const { fullName, department, username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  const user = await User.create({
    fullName,
    department,
    username,
    password,
    role: 'employee'
  });

  res.status(201).json({
    success: true,
    message: 'Register successful',
    data: {
      id: user._id,
      fullName: user.fullName,
      department: user.department,
      username: user.username,
      role: user.role
    }
  });
});

export const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select('+password');
});