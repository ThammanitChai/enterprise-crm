import User from '../models/User.js';
import { signToken } from '../utils/token.js';
import { catchAsync } from '../utils/catchAsync.js';

// REGISTER
export const register = catchAsync(async (req, res) => {
  const { fullName, department, username, password } = req.body;

  const exists = await User.findOne({ username });

  if (exists) {
    return res.status(400).json({
      success: false,
      message: 'Username already exists'
    });
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

// LOGIN
export const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide username and password'
    });
  }

  const user = await User.findOne({ username }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'User not found'
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid password'
    });
  }

  const token = signToken(user._id);

  res.status(200).json({
    success: true,
    token,
    data: {
      id: user._id,
      fullName: user.fullName,
      department: user.department,
      username: user.username,
      role: user.role
    }
  });
});

// GET CURRENT USER
export const me = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});