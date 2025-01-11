import { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import AddTask from "./AddTask";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const logout = async () => {
    try {
      const { data } = await axios.get("/logout");
      sessionStorage.removeItem("userData");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getTasks() {
      // console.log(userData)
      if (!userData) {
        console.log("User not Authenticated");
        navigate("/");
      } else {
        try {
          let { data } = await axios.get("/user/tasks");
          // console.log(data.tasks);
          dispatch(setTasks(data.tasks));
        } catch (err) {
          console.log(err);
        }
      }
    }
    getTasks();
  }, []);

  return (
    <div className="kanban-board">
      <div className="header">
        <div className="name">Hii {userData.name},</div>
        <button className="add-task-button" onClick={handleAddTask}>
          Add Task
        </button>
        <button className="logout" onClick={logout}>Logout</button>
      </div>
      <div className="columns">
        <TaskColumn
          status="Not Started"
          statusColor="#0089ED"
          isModalOpen={isModalOpen}
        />
        <TaskColumn
          status="In Process"
          statusColor="#02DD74"
          isModalOpen={isModalOpen}
        />
        <TaskColumn
          status="Blocked"
          statusColor="#FF441B"
          isModalOpen={isModalOpen}
        />
        <TaskColumn
          status="To Be Reviewed"
          statusColor="#D6009A"
          isModalOpen={isModalOpen}
        />
      </div>
      {isModalOpen && <AddTask setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default Home;
