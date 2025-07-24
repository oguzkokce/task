import React, { useEffect, useState, useRef } from "react";
import { getEnergy, progressCard, batchProgress, levelUp } from "../api";
import EnergyBar from "./EnergyBar";
import CardItem from "./CardItem";
import LevelFilter from "./LevelFilter";
import "../App.css";

const USER_ID = "68810e2e416cca3428a02978"; // Sabit userId

// Kart master data (8 kart, 3 seviye)
const CARD_MASTER = [
  {
    key: 'uzun-kilic',
    levels: [
      { name: 'Gümüş Diş', desc: 'Sade, keskin bir savaş kılıcı.', image: '/assets/items/savasbaltasi1.png' },
      { name: 'Zümrüt Yürek', desc: 'Can alıcı darbeler için güçlendirildi.', image: '/assets/items/savasbaltasi2.png' },
      { name: 'Altın Pençe', desc: 'Kralların kanını döken efsanevi keskinlik.', image: '/assets/items/savasbaltasi3.png' },
    ],
  },
  {
    key: 'savas-baltasi',
    levels: [
      { name: 'Hafif Balta Parıltısı', desc: 'Hafif el hali bir balta.', image: '/assets/items/savasbaltasi1.png' },
      { name: 'Zümrüt Kesik', desc: 'Düşmanı donduran güçlü balta.', image: '/assets/items/savasbaltasi2.png' },
      { name: 'Ateşin Yovarı', desc: 'Her vuruşu ruhu koparır.', image: '/assets/items/savasbaltasi3.png' },
    ],
  },
  {
    key: 'buyu-asasi',
    levels: [
      { name: 'Büyücü Dalı', desc: 'Temel büyü asası.', image: '/assets/items/buyuasasi1.png' },
      { name: 'Zümrüt Kök', desc: 'Doğanın gücünü taşır.', image: '/assets/items/buyuasasi2.png' },
      { name: 'Altın Kök', desc: 'Yıldırımları yere indirtir, zamanı büker.', image: '/assets/items/buyuasasi3.png' },
    ],
  },
  {
    key: 'kalkan',
    levels: [
      { name: 'Gümüş Siper', desc: 'Basit bir koruma aracı.', image: '/assets/items/kalkan.png' },
      { name: 'Zümrüt Duvar', desc: 'Gelen okları durdurur.', image: '/assets/items/kalkan2.png' },
      { name: 'Altın Duvar', desc: 'Her türlü darbeye karşı koyar.', image: '/assets/items/kalkan3.png' },
    ],
  },
  {
    key: 'savas-cekici',
    levels: [
      { name: 'Taş Parçalayıcı', desc: 'Ağır ve yıkıcı bir çekiç.', image: '/assets/items/savascekici1.png' },
      { name: 'Zümrüt Etki', desc: 'Zırhları paramparça eder.', image: '/assets/items/savascekici2.png' },
      { name: 'Altın Ezici', desc: 'En büyük düşmanları ezer.', image: '/assets/items/savascekici3.png' },
    ],
  },
  {
    key: 'egri-kilic',
    levels: [
      { name: 'Gümüş Bıçak', desc: 'Hızlı ve ölümcül.', image: '/assets/items/egrikilic1.png' },
      { name: 'Zümrüt Çengel', desc: 'Düşmanı sersemletir.', image: '/assets/items/egrikilic2.png' },
      { name: 'Altın Yılan', desc: 'Zehirli darbeler, kolay zaferler.', image: '/assets/items/egrikilic3.png' },
    ],
  },
  {
    key: 'kisa-kilic',
    levels: [
      { name: 'Gümüş Kesik', desc: 'Hızlı saldırı için ideal.', image: '/assets/items/kisakilic1.png' },
      { name: 'Zümrüt Dilim', desc: 'Randımanlı bir bıçak.', image: '/assets/items/kisakilic2.png' },
      { name: 'Altın Birim', desc: 'Randımanlı bir bıçak.', image: '/assets/items/kisakilic3.png' },
    ],
  },
  {
    key: 'buyu-kitabi',
    levels: [
      { name: 'Gümüş Sayfalar', desc: 'Büyüye yeni başlayanlar için.', image: '/assets/items/buyukitabi1.png' },
      { name: 'Zümrüt Harfler', desc: 'Doğanın sırlarını barındırır.', image: '/assets/items/buyukitabi2.png' },
      { name: 'Altın Kitabe', desc: 'En eski büyülerin kaynağı.', image: '/assets/items/buyukitabi3.png' },
    ],
  },
];

function getCardMeta(card, cards) {
  const idx = cards.findIndex((c) => c._id === card._id);
  const master = CARD_MASTER[idx % CARD_MASTER.length];
  const levelIdx = Math.max(0, Math.min((card.level || 1) - 1, 2));
  return master ? master.levels[levelIdx] : { name: '', desc: '', image: '' };
}

export default function CardsPage() {
  const [energy, setEnergy] = useState(0);
  const energyRef = useRef(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [holdTimer, setHoldTimer] = useState(null);

  const clickBuffer = useRef({});
  const timerRef = useRef({});

  // Tüm timer ve interval temizliği
  const clearAllBuffersAndTimers = () => {
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
    }
    Object.keys(timerRef.current).forEach((key) => {
      if (timerRef.current[key]) {
        clearTimeout(timerRef.current[key]);
        timerRef.current[key] = null;
      }
    });
    Object.keys(clickBuffer.current).forEach((key) => {
      clickBuffer.current[key] = 0;
    });
  };

  // Kart ve enerji yükle (mount only)
  useEffect(() => {
    fetch(`/api/cards?userId=${USER_ID}`)
      .then((r) => r.json())
      .then((data) => setCards(Array.isArray(data) ? data : []));
    getEnergy(USER_ID).then((data) => {
      setEnergy(data.energy);
      energyRef.current = data.energy;
      setRemainingMs(data.remainingMs || 0);
    });
  }, []);

  // Her saniye kalan süreyi azalt
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs((prev) => (prev > 0 ? prev - 1000 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Enerji her değiştiğinde ref'i güncelle
  const setEnergySafe = (val) => {
    energyRef.current = val;
    setEnergy(val);
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
    const card = cards.find((c) => c._id === cardId);
    const newLevel = level !== null ? level : card?.level;
    if (progress >= 100 || newLevel === 3) {
      clearAllBuffersAndTimers();
    }
  }

  // Tekli progress (çoklu tıklama için buffer'lı)
  const handleProgressBuffered = (cardId) => {
    const card = cards.find((c) => c._id === cardId);
    if (!card || card.level >= 3 || card.progress >= 100 || energyRef.current <= 0) {
      clearAllBuffersAndTimers();
      return;
    }
    clickBuffer.current[cardId] = (clickBuffer.current[cardId] || 0) + 1;
    if (timerRef.current[cardId]) clearTimeout(timerRef.current[cardId]);
    if (clickBuffer.current[cardId] >= 10) {
      flushBuffer(cardId);
    } else {
      timerRef.current[cardId] = setTimeout(() => flushBuffer(cardId), 1000);
    }
    // Localde hemen animasyon için göster
    setCards((prev) =>
      prev.map((c) =>
        c._id === cardId && c.progress < 100 && c.level < 3 && energyRef.current > 0
          ? { ...c, progress: Math.min(c.progress + 2, 100) }
          : c
      )
    );
    setEnergySafe(Math.max(energyRef.current - 1, 0));
  };

  // Bufferı backend'e gönder
  const flushBuffer = async (cardId) => {
    const count = clickBuffer.current[cardId] || 0;
    const card = cards.find((c) => c._id === cardId);
    if (!card || card.level >= 3 || card.progress >= 100 || count === 0 || energyRef.current <= 0) {
      clearAllBuffersAndTimers();
      return;
    }
    clickBuffer.current[cardId] = 0;
    if (timerRef.current[cardId]) {
      clearTimeout(timerRef.current[cardId]);
      timerRef.current[cardId] = null;
    }
    try {
      const res = await batchProgress(USER_ID, cardId, count);
      setCards((prev) =>
        prev.map((c) =>
          c._id === cardId
            ? { ...c, progress: res.progress, level: res.level || c.level }
            : c
        )
      );
      setEnergySafe(res.energy);
      if (res.progress >= 100 || res.level === 3) {
        clearAllBuffersAndTimers();
      }
    } catch (err) {
      clearAllBuffersAndTimers();
    }
  };

  // Basılı tutma (hold) batch'i
  const handleHoldStart = (cardId) => {
    const card = cards.find((c) => c._id === cardId);
    if (!card || card.level >= 3 || card.progress >= 100 || energyRef.current < 10 || loading) return;
    if (holdTimer) {
      clearInterval(holdTimer);
      setHoldTimer(null);
    }
    const timer = setInterval(async () => {
      if (loading) return;
      const latestCard = cards.find((c) => c._id === cardId);
      if (!latestCard || latestCard.level >= 3 || latestCard.progress >= 100 || energyRef.current < 10) {
        handleHoldEnd();
        return;
      }
      setLoading(true);
      try {
        const usable = Math.min(5, energyRef.current, Math.ceil((100 - latestCard.progress) / 2));
        if (usable < 1) {
          handleHoldEnd();
          setLoading(false);
          return;
        }
        const res = await batchProgress(USER_ID, cardId, usable);
        updateCard(cardId, res.progress, res.level);
        setEnergySafe(res.energy);
        const data = await getEnergy(USER_ID);
        setRemainingMs(data.remainingMs || 0);
        if (res.progress >= 100 || res.level === 3) {
          handleHoldEnd();
        }
      } catch (err) {
        handleHoldEnd();
      }
      setLoading(false);
    }, 400);
    setHoldTimer(timer);
  };

  // Basılı tutma bırak
  const handleHoldEnd = () => {
    if (holdTimer) clearInterval(holdTimer);
    setHoldTimer(null);
  };

  // Batch (10'lu hızlı geliştirme)
  const handleBatch = async (cardId, count = 10) => {
    const card = cards.find((c) => c._id === cardId);
    if (!card || card.level >= 3 || card.progress >= 100 || energyRef.current < 10) return;
    setLoading(true);
    const res = await batchProgress(USER_ID, cardId, count);
    updateCard(cardId, res.progress);
    setEnergySafe(res.energy);
    const data = await getEnergy(USER_ID);
    setRemainingMs(data.remainingMs || 0);
    setLoading(false);
  };

  // Seviye Atla
  const handleLevelUp = async (cardId) => {
    const card = cards.find((c) => c._id === cardId);
    if (!card || card.level >= 3 || card.progress < 100) return;
    setLoading(true);
    const res = await levelUp(USER_ID, cardId);
    updateCard(cardId, res.progress, res.level);
    setLoading(false);
  };

  // Enerji otomatik yenileme
  useEffect(() => {
    if (remainingMs === 0 && energyRef.current < 100) {
      getEnergy(USER_ID).then((data) => {
        setEnergySafe(data.energy);
        setRemainingMs(data.remainingMs || 0);
      });
    }
  }, [remainingMs]);

  // Kart filtresi
  const filteredCards = cards.filter((card) => {
    if (selectedLevel === "all") return true;
    if (selectedLevel === "max") return card.level === 3;
    return card.level === selectedLevel;
  });

  return (
    <div>
      <EnergyBar percent={energy} remainingMs={remainingMs} />
      <LevelFilter selected={selectedLevel} setSelected={setSelectedLevel} />
      <div className="ns-cardlist-figma">
        {filteredCards.map((card) => {
          const meta = getCardMeta(card, cards);
          return (
            <CardItem
              key={card._id}
              image={meta.image}
              name={meta.name}
              description={meta.desc}
              level={card.level}
              progress={card.progress}
              energy={energy}
              onProgress={() => handleProgressBuffered(card._id)}
              onBatch={() => handleBatch(card._id, 10)}
              onLevelUp={() => handleLevelUp(card._id)}
              loading={loading}
              disableProgress={energy < 1 || card.progress >= 100 || loading}
              disableBatch={energy < 10 || card.progress >= 100 || loading}
              disableLevelUp={card.progress < 100 || loading}
              disableHold={energy < 10 || card.progress >= 100 || loading}
              onHoldStart={() => handleHoldStart(card._id)}
              onHoldEnd={handleHoldEnd}
            />
          );
        })}
      </div>
    </div>
  );
}
