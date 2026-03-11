import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    lineId: { type: String, trim: true }
  },
  { _id: true }
);

const customerSchema = new mongoose.Schema(
  {
    customerCode: { type: String, unique: true, index: true },
    companyName: { type: String, required: true, trim: true, index: true },
    storeImage: { type: String, default: '' },
    mapUrl: { type: String, default: '' },
    contacts: {
      type: [contactSchema],
      validate: [(arr) => arr.length <= 10, 'Maximum 10 contacts allowed']
    },
    otherImages: [{ type: String }],
    province: { type: String, default: '' },
    businessType: { type: String, default: '' },
    tags: [{ type: String }],
    priority: { type: Number, min: 1, max: 5, default: 3 },
    status: {
      type: String,
      enum: ['active', 'inactive', 'lead', 'vip'],
      default: 'lead'
    },
    notes: { type: String, default: '' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

customerSchema.index({ companyName: 'text', 'contacts.name': 'text', 'contacts.email': 'text' });

export default mongoose.model('Customer', customerSchema);