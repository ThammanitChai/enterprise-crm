import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
    type: {
      type: String,
      enum: ['call', 'line', 'email', 'meeting', 'quotation', 'other'],
      default: 'call'
    },
    direction: {
      type: String,
      enum: ['inbound', 'outbound'],
      default: 'outbound'
    },
    description: { type: String, required: true },
    images: [{ type: String }],
    hotness: { type: Number, min: 1, max: 5, default: 3 },
    followUpDate: { type: Date, default: null },
    followUpChannel: { type: String, default: '' },
    nextActionNote: { type: String, default: '' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['today', 'upcoming', 'overdue', 'completed'],
      default: 'upcoming'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);