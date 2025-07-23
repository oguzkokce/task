import React from "react";
import "../App.css";

export default function NavigationBar() {
  return (
    <div className="navbar">
     <div className="ns-navbar-body">
  <div className="ns-navbar-left">
    <button className="ns-navbar-cancel">Cancel</button>
  </div>
  <div className="ns-navbar-middle">
    <div className="ns-navbar-label">Your bot</div>
    <div className="ns-navbar-footnote">bot</div>
  </div>
  <div className="ns-navbar-right">
    <div className="ns-navbar-ellipsis">
      <img src="/assets/svg/Shape.svg" alt="More" className="ns-navbar-ellipsis-icon" />
    </div>
  </div>
</div>
<div className="ns-navbar-separator"></div>

    </div>
  );
}
