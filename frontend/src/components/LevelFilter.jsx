import React from "react";
import "../App.css";

const filters = [
  { label: "Tüm Seviyeler", value: "all" },
  { label: "Sv1", value: 1 },
  { label: "Sv2", value: 2 },
  { label: "Max Sv", value: "max" },
];

export default function LevelFilter({ selected, setSelected }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        margin: "0 0 16px 0",
      }}
    >
      {filters.map((f) => (
        <button
          key={f.value}
          className={`ns-levelfilter-figma-btn${selected === f.value ? " selected" : ""}`}
          onClick={() => setSelected(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
