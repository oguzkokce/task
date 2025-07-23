import React from "react";
import CardList from "./components/CardList";
import "./App.css";
import EnergyBar from "./components/EnergyBar";
import LevelFilter from "./components/LevelFilter";
import NavigationBar from "./components/NavigationBar";
import StatusBar from "./components/StatusBar";

function App() {
  return (
    <div className="ns-app-wrapper">
      <StatusBar />
      <NavigationBar />
      <div className="ns-main-bg-figma">
        <EnergyBar energy={95} remainingTime="1:59" />
        <LevelFilter />
        <CardList />
      </div>
    </div>
  );
}

export default App;
