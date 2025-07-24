import React from "react";
import CardsPage from "./components/CardsPage";
import NavigationBar from "./components/NavigationBar";
import StatusBar from "./components/StatusBar";
import "./App.css";

function App() {
  return (
    <div className="ns-app-wrapper">
      <StatusBar />
      <NavigationBar />
      <div className="ns-main-bg-figma">
        <CardsPage />
      </div>
    </div>
  );
}

export default App;
