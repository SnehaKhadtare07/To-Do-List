import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TaskItem = ({ task, index }) => {
  const { toggleTask, deleteTask, editTask } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(task.text);

  const finishEditing = () => {
    setIsEditing(false);
    editTask(index, temp);
  };

  // Determine priority class for styling
  const priorityClass = task.priority ? `priority-${task.priority.toLowerCase()}` : "";

  return (
    <li className={`task-item ${task.completed ? "done" : ""} ${priorityClass}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(index)}
      />
      {isEditing ? (
        <input
          autoFocus
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          onBlur={finishEditing}
          onKeyDown={(e) => e.key === "Enter" && finishEditing()}
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>
          {task.text}
        </span>
      )}
      <button onClick={() => deleteTask(index)}>🗑</button>
      <div className={`priority-circle priority-circle-${task.priority.toLowerCase()}`}></div>
    </li>
  );
};

export default TaskItem;
