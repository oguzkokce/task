const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: Number, default: 1 },
  progress: { type: Number, default: 0 },   // 0-100 arası
});

module.exports = mongoose.model('Card', cardSchema);
