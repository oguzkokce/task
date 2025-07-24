const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// GET /api/cards?userId=xyz
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId gerekli.' });
  const cards = await Card.find({ owner: userId });
  res.json(cards);
});

module.exports = router; 