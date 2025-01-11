import React from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, statusColor, isModalOpen }) => {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((t) => t.status === status)
  );
  // console.log(tasks);

  return (
    <div className="task-column">
      <div
        className="task-column-bg"
        style={{ backgroundColor: statusColor }}
      ></div>
      <h2>{status}</h2>
      {!isModalOpen && (
        <div className="tasks-div">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} statusColor={statusColor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
