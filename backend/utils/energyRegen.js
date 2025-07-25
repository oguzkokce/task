// utils/energyRegen.js
function regenerateEnergy(user) {
  const maxEnergy = 100;
  const regenInterval = 2 * 60 * 1000; // 2 dakika
  const now = Date.now();
  const lastUpdate = user.energyLastUpdated
    ? user.energyLastUpdated.getTime()
    : now;

  if (user.energy >= maxEnergy) {
    user.energy = maxEnergy;
    user.energyLastUpdated = now;
    return user;
  }

  // Geçen zamanı bul
  const elapsed = now - lastUpdate;
  const regenCount = Math.floor(elapsed / regenInterval);

  if (regenCount > 0) {
    user.energy = Math.min(user.energy + regenCount, maxEnergy);
    user.energyLastUpdated = new Date(lastUpdate + regenCount * regenInterval);
  }

  return user;
}

module.exports = regenerateEnergy;
