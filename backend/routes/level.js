const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// POST /api/level-up
router.post('/', async (req, res) => {
  const { cardId, userId } = req.body;
  if (!cardId || !userId) return res.status(400).json({ error: 'cardId ve userId gerekli.' });

  const card = await Card.findById(cardId);
  if (!card) return res.status(404).json({ error: 'Card not found' });
  if (String(card.owner) !== String(userId)) return res.status(403).json({ error: 'Bu karta erişim yetkiniz yok.' });

  if (card.progress < 100) return res.status(400).json({ error: 'Seviye atlamak için progress %100 olmalı.' });

  card.level += 1;
  card.progress = 0;
  await card.save();

  res.json({ level: card.level, progress: card.progress });
});

module.exports = router;
