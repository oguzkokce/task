import React, { useEffect, useState } from "react";
import { getEnergy, progressCard, batchProgress, levelUp } from "./api";

const USER_ID = "68810e2e416cca3428a02978"; // Sabit userId

export default function CardsPage() {
  const [energy, setEnergy] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Kartları ve enerji durumunu yükle
  useEffect(() => {
    // Kartları fetch et (kendi endpointinize göre)
    fetch(`/api/cards?userId=${USER_ID}`)
      .then((r) => r.json())
      .then(setCards);
    // Enerji
    getEnergy(USER_ID).then((data) => setEnergy(data.energy));
  }, []);

  // Geliştir (tekli)
  const handleProgress = async (cardId) => {
    setLoading(true);
    const res = await progressCard(USER_ID, cardId);
    updateCard(cardId, res.progress);
    setEnergy(res.energy);
    setLoading(false);
  };

  // Geliştir (batch)
  const handleBatch = async (cardId, count = 10) => {
    setLoading(true);
    const res = await batchProgress(USER_ID, cardId, count);
    updateCard(cardId, res.progress);
    setEnergy(res.energy);
    setLoading(false);
  };

  // Seviye Atla
  const handleLevelUp = async (cardId) => {
    setLoading(true);
    const res = await levelUp(cardId);
    updateCard(cardId, res.progress, res.level);
    setLoading(false);
  };

  // Kart güncelle
  function updateCard(cardId, progress, level = null) {
    setCards((prev) =>
      prev.map((c) =>
        c._id === cardId
          ? { ...c, progress, ...(level !== null ? { level } : {}) }
          : c
      )
    );
  }

  // Render
  return (
    <div>
      <div>Enerji: {energy}</div>
      {cards.map((card) => (
        <div key={card._id} style={{ border: "1px solid #eee", margin: 8, padding: 8 }}>
          <img src={card.image} alt={card.name} width={64} />
          <div>{card.name} (Seviye {card.level})</div>
          <div>Progress: %{card.progress}</div>
          <progress value={card.progress} max={100}></progress>
          <button
            disabled={energy < 1 || card.progress >= 100 || loading}
            onClick={() => handleProgress(card._id)}
          >
            Geliştir
          </button>
          <button
            disabled={energy < 10 || card.progress >= 100 || loading}
            onClick={() => handleBatch(card._id, 10)}
          >
            10'lu Geliştir
          </button>
          <button
            disabled={card.progress < 100 || loading}
            onClick={() => handleLevelUp(card._id)}
          >
            Seviye Atla
          </button>
        </div>
      ))}
    </div>
  );
}
