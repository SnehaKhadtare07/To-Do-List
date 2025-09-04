import React from "react";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import "../styles/Home.css";

const Dashboard = () => {
  return (
    <div className="home-layout">
      <Sidebar />
      <TaskList />
    </div>
  );
};

export default Dashboard;
