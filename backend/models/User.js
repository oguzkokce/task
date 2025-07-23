const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  energy: { type: Number, default: 100 },
  energyLastUpdated: { type: Date, default: Date.now }, // enerji yenileme takibi
});

module.exports = mongoose.model('User', userSchema);
