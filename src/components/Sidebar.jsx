import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import "../styles/Sidebar.css";

const themes = [
  { name: "blue", color: "#2A4D75" },
  { name: "cat1", color: "#9882ac" },
  { name: "cat2", color: "#FFD3D6" },
  { name: "cat3", color: "#EDE8D0" },
  { name: "cat4", color: "#F0E6FA" },
  { name: "cat5", color: "#FFC2D1" },
  { name: "cat6", color: "#030918" },
  { name: "Doodle1", color: "#59607E" },
  { name: "Doodle2", color: "black" },
  { name: "Dreamland", color: "#FCE4EC" },
  { name: "Forest", color: "#051912" },
  { name: "GoldenHour", color: "#C49102" },
  { name: "GoldenPath", color: "#DAA520" },
  { name: "green", color: "#ADD0B3" },
  { name: "minecraft1", color: "#367588" },
  { name: "minecraft2", color: "#DCFFB6" },
  { name: "minecraft3", color: "#AB784E" },
  { name: "Mountain", color: "#0B2B28" },
  { name: "ocean", color: "#04A1BF" },
  { name: "pink", color: "#EDAEC0" },
  { name: "pinkcity", color: "F8BBD0" },
  { name: "RainDays", color: "#526474" },
  { name: "ShadeOfBrown1", color: "#9C866B" },
  { name: "ShadeOfBrown2", color: "#756551" },
  { name: "sky", color: "#D8F2FF" },
  { name: "sqGrids", color: "#FF1CB" },
  { name: "StudyVibes1", color: "#504F72" },
  { name: "StudyVibes2", color: "#FFEE8C" },
  { name: "SunsetSeashore", color: "#EFA59A" },
  { name: "StudyVibes3", color: "#71797E" },
  { name: "Sunset&Seashore", color: "#EFA59A" },
  { name: "VoiletFrame", color: "#272757" },
];

const Sidebar = () => {
  const {
    lists,
    addList,
    deleteList,
    activeListIndex,
    setActiveListIndex,
    changeBackground,
  } = useContext(TodoContext);
  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    addList(newListTitle);
    setNewListTitle("");
  };

  const activeBackground = lists[activeListIndex]?.background || "default";

  const handleThemeChange = (e) => {
    changeBackground(e.target.value);
  };

  return (
    <aside className={`sidebar ${activeBackground}`}>
      <h2>📝 Lists : </h2>
      <div className="add-list">
        <input
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="New list..."
        />
        <button onClick={handleAddList}>+</button>
      </div>

      {/* Removed background theme dropdown as per user request */}

      <div className="list-container">
        {lists.map((list, i) => (
          <div
            key={i}
            className={`list-tab ${i === activeListIndex ? "active" : ""}`}
          >
            <button onClick={() => setActiveListIndex(i)}>{list.title}</button>
            <span
              className="delete-btn"
              onClick={() => deleteList(i)}
              title="Delete"
            >
              ✕
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
