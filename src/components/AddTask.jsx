import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import axios from "../utils/axios";

const AddTask = ({ setIsModalOpen }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Not Started");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      let { data } = await axios.post("/task/add", {
        title,
        desc,
        date,
        status,
      });
      // console.log(data);
      dispatch(addTask(data.task));
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };
  return (
    <div className="modal-content">
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Not Started">Not Started</option>
        <option value="In Procress">In Progress</option>
        <option value="Blocked">Blocked</option>
        <option value="To Be Reviewed">To Be Reviewed</option>
      </select>
      <button onClick={handleSubmit}>Create</button>
      <button onClick={() => setIsModalOpen(false)}>Cancel</button>
    </div>
  );
};

export default AddTask;
