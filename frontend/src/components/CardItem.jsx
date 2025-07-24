import React from "react";
import "../App.css";

export default function CardItem({
  image,
  name,
  description,
  level,
  progress,
  energy,
  onProgress,
  onBatch,
  onLevelUp,
  loading,
  disableProgress,
  disableBatch,
  disableLevelUp,
  disableHold,
  onHoldStart,
  onHoldEnd,
}) {
  return (
    <div className="ns-card-figma">
      <div className="ns-card-figma-img-wrap">
        <img src={encodeURI(image)} alt={name} className="ns-card-figma-img" />
        <div className="ns-card-figma-level">Seviye {level}</div>
      </div>
      <div className="ns-card-figma-title">{name}</div>
      <div className="ns-card-figma-desc">{description}</div>
      <div className="ns-card-figma-progress-upgrade-row">
        <div className="ns-card-figma-progress-bg">
          <div className="ns-card-figma-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="ns-card-figma-progress-percent">%{progress}</span>
        {level === 3 ? (
          <button
            className="ns-card-figma-upgrade-btn"
            disabled
          >
            Max Sv
          </button>
        ) : progress >= 100 ? (
          <button
            className="ns-card-figma-upgrade-btn"
            disabled={disableLevelUp}
            onClick={onLevelUp}
          >
            Yükselt
          </button>
        ) : (
          <button
            className="ns-card-figma-upgrade-btn"
            disabled={disableProgress}
            onClick={onProgress}
            {...(!disableHold && !disableProgress && {
              onMouseDown: onHoldStart,
              onMouseUp: onHoldEnd,
              onMouseLeave: onHoldEnd,
              onTouchStart: onHoldStart,
              onTouchEnd: onHoldEnd,
            })}
          >
            <span className="energy-group">
              <img src="/assets/case-energy-1.png" alt="Enerji" className="ns-card-figma-energy-icon" />
              <span className="energy-minus">-1</span>
            </span>
            <span className="upgrade-label">Geliştir</span>
          </button>
        )}
      </div>
    </div>
  );
}
