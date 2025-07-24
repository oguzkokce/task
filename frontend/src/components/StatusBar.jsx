import React from "react";
import "../App.css"; // CSS'ini aşağıda veriyorum

export default function StatusBar() {
  return (
    <div className="statusbar">
      <span className="statusbar-time">9:41</span>
      <div className="statusbar-icons">
        <img
          src="/assets/svg/Cellular-Connection.svg"
          alt="Sinyal"
          className="statusbar-icon signal"
        />
        <img
          src="/assets/svg/WiFi.svg"
          alt="WiFi"
          className="statusbar-icon wifi"
        />
        <img
          src="/assets/svg/Battery.svg"
          alt="Pil"
          className="statusbar-icon battery"
        />
      </div>
    </div>
  );
}
