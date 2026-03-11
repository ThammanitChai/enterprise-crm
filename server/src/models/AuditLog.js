import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    detail: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model('AuditLog', auditLogSchema);