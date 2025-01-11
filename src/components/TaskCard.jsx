import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, moveTask } from "../redux/taskSlice";
import axios from "../utils/axios";

const TaskCard = ({ task, statusColor }) => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  // console.log(task.status);

  const handleMoveTask = async (status) => {
    // console.log(status)
    try {
      let { data } = await axios.post(`/task/move/${task._id}`, {
        status: status,
      });
      // console.log(data);
      dispatch(moveTask({ id: task._id, newTask:data.task }));
      setShowOptions(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      let { data } = await axios.get(`/task/delete/${task._id}`);
      // console.log(data);
      dispatch(deleteTask({ id: task._id }));
      setShowOptions(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task-card">
      <button
        className="options-button"
        onClick={() => setShowOptions(!showOptions)}
        // onBlur={() => setShowOptions(!showOptions)}
      >
        …
      </button>
      {showOptions && (
        <div className="options-menu show">
          {task.status !== "In Process" && (
            <button onClick={()=>{handleMoveTask("In Process")}}>
              Move to In Process
            </button>
          )}
          {task.status !== "Blocked" && (
            <button onClick={() => {handleMoveTask("Blocked")}}>
              Move to Blocked
            </button>
          )}
          {task.status !== "To Be Reviewed" && (
            <button onClick={() => {handleMoveTask("To Be Reviewed")}}>
              Move to To Be Reviewed
            </button>
          )}
          <button onClick={() => {handleDeleteTask()}} style={{ color: "red" }}>
            Delete
          </button>
        </div>
      )}
      <div className="task-header">
        <h4>{task.title}</h4>
        <span style={{ backgroundColor: statusColor, color: "white" }}>
          {new Date(task.date).toISOString().split("T")[0]}
        </span>
      </div>
      <div className="task-content">
        <p>{task.desc}</p>
      </div>
    </div>
  );
};

export default TaskCard;
