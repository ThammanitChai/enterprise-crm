import mongoose from 'mongoose';

const salesForecastSchema = new mongoose.Schema(
  {
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    level: { type: String, enum: ['company', 'team', 'individual'], required: true },
    targetAmount: { type: Number, default: 0 },
    actualSales: { type: Number, default: 0 },
    forecastNew: { type: Number, default: 0 },
    backlogForecast: { type: Number, default: 0 },
    teamName: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

salesForecastSchema.index({ month: 1, year: 1, level: 1, teamName: 1, user: 1 }, { unique: true });

export default mongoose.model('SalesForecast', salesForecastSchema);