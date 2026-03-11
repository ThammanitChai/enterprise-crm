import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const exists = await User.findOne({ username: process.env.ADMIN_SEED_USERNAME });
if (exists) {
  console.log('Admin already exists');
  process.exit(0);
}

await User.create({
  fullName: process.env.ADMIN_SEED_NAME,
  department: process.env.ADMIN_SEED_DEPARTMENT,
  username: process.env.ADMIN_SEED_USERNAME,
  password: process.env.ADMIN_SEED_PASSWORD,
  role: 'admin'
});

console.log('Admin seeded successfully');
process.exit(0);