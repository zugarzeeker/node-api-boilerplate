import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  __v: { type: Number, select: false },
  name: String
});

export default mongoose.model('SampleI18n', schema);
