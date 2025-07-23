import React from "react";
import "../App.css"; // CSS'i ayrı tutmak için (yada App.css'e ekle)

export default function EnergyBar({ percent = 95, remaining = "1:59" }) {
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
            %1 Yenilenmesine Kalan: {remaining}
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
