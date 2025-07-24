// api.js
export const getEnergy = async (userId) => {
    const res = await fetch(`/api/energy?userId=${userId}`);
    return await res.json();
  };
  
  export const progressCard = async (userId, cardId) => {
    const res = await fetch(`/api/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, cardId }),
    });
    return await res.json();
  };
  
  export const batchProgress = async (userId, cardId, count) => {
    const res = await fetch(`/api/progress/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, cardId, count }),
    });
    return await res.json();
  };
  
  export const levelUp = async (userId, cardId) => {
    const res = await fetch(`/api/level-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, cardId }),
    });
    return await res.json();
  };
  