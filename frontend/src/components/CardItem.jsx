import React from "react";
import "../App.css";

export default function CardItem({
  image,
  name,
  description,
  level,
  progress,
  energy,
}) {
  return (
    <div className="ns-card-figma">
      <div className="ns-card-figma-img-wrap">
        <img src={image} alt={name} className="ns-card-figma-img" />
        <div className="ns-card-figma-level">Seviye {level}</div>
      </div>
      <div className="ns-card-figma-title">{name}</div>
      <div className="ns-card-figma-desc">{description}</div>
      <div className="ns-card-figma-progress-upgrade-row">
        <div className="ns-card-figma-progress-bg">
          <div className="ns-card-figma-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="ns-card-figma-progress-percent">%{progress}</span>
        <button className="ns-card-figma-upgrade-btn">
          <span className="energy-group">
            <img src="/assets/case-energy 1.png" alt="Enerji" className="ns-card-figma-energy-icon" />
            <span className="energy-minus">-1</span>
          </span>
          <span className="upgrade-label">Geliştir</span>
        </button>
      </div>
    </div>
  );
}
