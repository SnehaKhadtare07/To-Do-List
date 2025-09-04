import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TaskItem from "./TaskItem";

const themes = [
  { name: "blue", color: "#2A4D75", img: "blue.jpg" },
  { name: "cat1", color: "#9882ac", img: "cat1.jpg" },
  { name: "cat2", color: "#FFD3D6", img: "cat2.jpg" },
  { name: "cat3", color: "#EDE8D0", img: "cat3.jpg" },
  { name: "cat4", color: "#F0E6FA", img: "cat4.jpg" },
  { name: "cat5", color: "#FFC2D1", img: "cat5.jpg" },
  { name: "cat6", color: "#030918", img: "cat6.jpg" },
  { name: "Doodle1", color: "#59607E", img: "Doodle1.jpg" },
  { name: "Doodle2", color: "black", img: "Doodle2.jpg" },
  { name: "Dreamland", color: "#FCE4EC", img: "Dreamland.jpg" },
  { name: "Forest", color: "#051912", img: "Forest.jpg" },
  { name: "GoldenHour", color: "#C49102", img: "GoldenHour.jpg" },
  { name: "GoldenPath", color: "#DAA520", img: "GoldenPath.jpg" },
  { name: "green", color: "#ADD0B3", img: "green.jpg" },
  { name: "minecraft1", color: "#367588", img: "minecraft1.jpg" },
  { name: "minecraft2", color: "#DCFFB6", img: "minecraft2.jpg" },
  { name: "minecraft3", color: "#AB784E", img: "minecraft3.jpg" },
  { name: "Mountain", color: "#0B2B28", img: "Mountain.jpg" },
  { name: "ocean", color: "#04A1BF", img: "ocean.jpg" },
  { name: "pink", color: "#EDAEC0", img: "pink.jpg" },
  { name: "pinkcity", color: "F8BBD0", img: "pinkCity.jpg" },
  { name: "RainDays", color: "#526474", img: "RainyDays.jpg" },
  { name: "ShadeOfBrown1", color: "#9C866B", img: "ShadeOfBrown1.jpg" },
  { name: "ShadeOfBrown2", color: "#756551", img: "ShadeOfBrown2.jpg" },
  { name: "sky", color: "#D8F2FF", img: "sky.jpg" },
  { name: "sqGrids", color: "#F1CB00", img: "SqGrids.jpg" },
  { name: "StudyVibes1", color: "#504F72", img: "StudyVibes1.jpg" },
  { name: "StudyVibes2", color: "#FFEE8C", img: "StudyVibes2.jpg" },
  { name: "StudyVibes3", color: "#71797E", img: "StudyVibes3.jpg" },
  { name: "SunsetSeashore", color: "#EFA59A", img: "Sunset&Seashore.jpg" },
  { name: "VoiletFrame", color: "#272757", img: "VoiletFrame.jpg" },
];

const TaskList = () => {
  const { lists, activeListIndex, addTask, sortMode, changeSortMode, changeBackground } = useContext(TodoContext);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");

  const activeList = lists[activeListIndex] || { tasks: [], background: "default" };

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    addTask(newTaskText, newTaskPriority);
    setNewTaskText("");
    setNewTaskPriority("Medium");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  // Sort tasks based on sortMode
  const sortedTasks = [...activeList.tasks].sort((a, b) => {
    if (sortMode === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.createdAt - b.createdAt;
  });

  return (
    <section className={`task-section ${activeList.background}`}>
      <h2>{activeList.title}</h2>

      {/* Add new task form */}
      <div className="add-task">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Sort and Background options in same row */}
      <div className="sort-options">
        <label>Sort by:</label>
        <select
          value={sortMode}
          onChange={(e) => changeSortMode(e.target.value)}
        >
          <option value="created">Created</option>
          <option value="priority">Priority</option>
        </select>
        <label>Background :</label>
        <select
          value={activeList.background}
          onChange={(e) => changeBackground(e.target.value)}
        >
          <option value="default">Default</option>
          {themes.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      <ul className={`task-list ${sortedTasks.length > 8 ? 'show-scrollbar' : ''}`}>
        {sortedTasks.map((task, index) => (
          <TaskItem key={index} task={task} index={index} />
        ))}
      </ul>
    </section>
  );
};

export default TaskList;
