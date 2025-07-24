const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const regenerateEnergy = require('../utils/energyRegen');

// GET /api/energy?userId=xyz
router.get('/', async (req, res) => {
  const { userId } = req.query;
  console.log('userId:', userId, '| Type:', typeof userId); // ekle!
  console.log('isValid:', mongoose.Types.ObjectId.isValid(userId)); // ekle!

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Geçersiz userId formatı' });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  regenerateEnergy(user);
  await user.save();

  // Kalan süre hesapla
  const maxEnergy = 100;
  const regenInterval = 2 * 60 * 1000; // 2 dakika
  let remainingMs = 0;
  if (user.energy < maxEnergy) {
    const now = Date.now();
    const lastUpdate = user.energyLastUpdated ? user.energyLastUpdated.getTime() : now;
    const elapsed = now - lastUpdate;
    remainingMs = regenInterval - (elapsed % regenInterval);
    if (remainingMs < 0) remainingMs = 0;
  }

  res.json({ energy: user.energy, remainingMs });
});

module.exports = router;
