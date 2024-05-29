import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'dataModels', required:true },
  createdAt: { type: Date, expires: '5m', default: Date.now }
});

const Token = mongoose.model('Token', tokenSchema);
export default Token;
