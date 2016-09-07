import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  __v: { type: Number, select: false },
  en: { type: ObjectId, ref: 'SampleI18n' },
  th: { type: ObjectId, ref: 'SampleI18n' },
  isDeleted: { type: Boolean, default: false, select: false }
});

export default mongoose.model('Sample', schema);
