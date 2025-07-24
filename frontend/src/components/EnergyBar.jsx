import React from "react";
import "../App.css"; // CSS'i ayrı tutmak için (yada App.css'e ekle)

export default function EnergyBar({ percent = 95, remainingMs = 0 }) {
  function formatMs(ms) {
    if (!ms || ms <= 0) return "00:00";
    const totalSec = Math.ceil(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }
  return (
    <div className="energy-bar-root">
      {/* Energy Icon */}
      <img
        src="/assets/case-energy.png"
        alt="Enerji"
        className="energy-bar-icon"
      />

      {/* Bar Content */}
      <div className="energy-bar-content">
        <div className="energy-bar-header">
          <span className="energy-bar-title">Enerji</span>
          <span className="energy-bar-remaining">
            %1 Yenilenmesine Kalan: {formatMs(remainingMs)}
          </span>
        </div>

        <div className="energy-bar-bg">
          <div
            className="energy-bar-fill"
            style={{ width: `${percent}%` }}
          ></div>
          <span className="energy-bar-percent">%{percent}</span>
        </div>
      </div>
    </div>
  );
}
