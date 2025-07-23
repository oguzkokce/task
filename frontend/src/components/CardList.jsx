import React from "react";
import CardItem from "./CardItem";
import "../App.css";

const items = [
  {
    id: 1,
    image: "/assets/Rectangle 5479.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 1,
    progress: 100,
    energy: -1,
  },
  {
    id: 2,
    image: "/assets/Rectangle 5479-2.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 1,
    progress: 0,
    energy: -1,
  },
  {
    id: 3,
    image: "/assets/Rectangle 5479-3.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 1,
    progress: 25,
    energy: -1,
  },
  {
    id: 4,
    image: "/assets/Rectangle 5479-4.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 1,
    progress: 50,
    energy: -1,
  },
  {
    id: 5,
    image: "/assets/Rectangle 5484.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 1,
    progress: 75,
    energy: -1,
  },
  {
    id: 6,
    image: "/assets/Rectangle 5489.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 1,
    progress: 0,
    energy: -1,
  },
  {
    id: 7,
    image: "/assets/Rectangle 5494.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 3,
    progress: 0,
    energy: -1,
  },
  {
    id: 8,
    image: "/assets/emerald-book.png",
    name: "Zümrüt Kehanet",
    description: "Sade, keskin bir savaş kılıcı.",
    level: 2,
    progress: 0,
    energy: -1,
  },
];

export default function CardList() {
  return (
    <div className="ns-cardlist-figma">
      {items.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </div>
  );
}
