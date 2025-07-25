const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const User = require("../models/User");
const regenerateEnergy = require("../utils/energyRegen");

// POST /api/progress (tekli veya batch)
router.post("/", async (req, res) => {
  const { cardId, userId, count = 1 } = req.body;
  if (!cardId || !userId)
    return res.status(400).json({ error: "cardId ve userId gerekli." });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  regenerateEnergy(user);

  const card = await Card.findById(cardId);
  if (!card) return res.status(404).json({ error: "Card not found" });
  if (String(card.owner) !== String(userId))
    return res.status(403).json({ error: "Bu karta erişim yetkiniz yok." });

  // Max level ise işlem engellensin
  if (card.level >= 3)
    return res.status(400).json({ error: "Kart max seviyede." });

  // Enerji ve progress hesapla
  const usable = Math.min(
    count,
    user.energy,
    Math.ceil((100 - card.progress) / 2),
  );
  if (usable < 1)
    return res
      .status(400)
      .json({ error: "Yetersiz enerji veya progress dolu." });

  card.progress += usable * 2;
  user.energy -= usable;

  let levelUp = false;
  if (card.progress >= 100) {
    card.level = Math.min(card.level + 1, 3);
    card.progress = 0;
    levelUp = true;
  }

  await card.save();
  await user.save();

  res.json({
    progress: card.progress,
    energy: user.energy,
    level: card.level,
    levelUp,
  });
});

module.exports = router;
