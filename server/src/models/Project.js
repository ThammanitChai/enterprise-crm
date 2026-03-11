import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    projectCode: { type: String, unique: true, sparse: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    projectName: { type: String, required: true },
    description: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    priority: { type: Number, min: 1, max: 5, default: 3 },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'closed'],
      default: 'open'
    },
    attachments: [{ type: String }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);