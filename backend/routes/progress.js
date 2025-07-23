const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const User = require('../models/User');
const regenerateEnergy = require('../utils/energyRegen');

// POST /api/progress
router.post('/', async (req, res) => {
    const { cardId, userId } = req.body;
    if (!cardId || !userId) return res.status(400).json({ error: 'cardId ve userId gerekli.' });
  
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    // Enerjiyi güncelle
    regenerateEnergy(user);
  
    if (user.energy < 1) return res.status(400).json({ error: 'Yetersiz enerji' });
  
    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ error: 'Card not found' });
  
    card.progress = Math.min(card.progress + 2, 100);
    await card.save();
  
    user.energy -= 1;
    await user.save();
  
    res.json({ progress: card.progress, energy: user.energy });
  });

  router.post('/batch', async (req, res) => {
    const { cardId, userId, count } = req.body;
    if (!cardId || !userId || !count) return res.status(400).json({ error: 'Eksik bilgi' });
    if (count < 1 || count > 50) return res.status(400).json({ error: 'Geçersiz count' });
  
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    regenerateEnergy(user);
  
    const usable = Math.min(count, user.energy);
    if (usable < 1) return res.status(400).json({ error: 'Yetersiz enerji' });
  
    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ error: 'Card not found' });
  
    let toIncrease = Math.min(usable * 2, 100 - card.progress);
    let realClick = Math.ceil(toIncrease / 2);
  
    card.progress += toIncrease;
    user.energy -= realClick;
  
    // Progress %100 olduysa
    if (card.progress > 100) card.progress = 100;
  
    await card.save();
    await user.save();
  
    res.json({ progress: card.progress, energy: user.energy });
  });
async function handleDevelopClick(count = 1) {
  const url = count === 1 
    ? '/api/progress'
    : '/api/progress/batch';
  const body = count === 1
    ? { userId, cardId }
    : { userId, cardId, count };
  const res = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }});
  const data = await res.json();
  setProgress(data.progress);
  setEnergy(data.energy);
}

async function handleLevelUp() {
  const res = await fetch('/api/level-up', {
    method: 'POST',
    body: JSON.stringify({ cardId }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  setLevel(data.level);
  setProgress(data.progress); // should be 0
}
module.exports = router;
