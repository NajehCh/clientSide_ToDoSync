import axios from "axios";
import React, { createContext, useEffect,useState } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";
import {useProjects} from "./projectContext"
const TasksContext = createContext();

//const serverUrl = "https://taskfyer.onrender.com/api/v1";
const serverUrl= process.env.NEXT_PUBLIC_SERVER_URL

export const TasksProvider = ({ children }) => {


  const userId = useUserContext().user._id;
  const {token}=useUserContext()
  const {projects} = useProjects()

  const initialTask = {
    title: "",
    description: "",
    priority: "low",
    dueDate: "", 
    completed: false,
    _id: "", 
  };
  
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = useState(initialTask);

  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [currentProject, setCurrentProject] = useState(null); // 👈 type Project si tu veux typer

  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask(initialTask);
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
    console.log(profileModal)
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask(initialTask);
  };

  useEffect(()=>{

  },[])
  // get tasks
  const getTasks = async () => {
    console.log(token)
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/api/task/user/tasks`,{
        headers:{
            Authorization:'Bearer '+token
        }
    });
      setTasks(response.data.data);
      console.log('task',tasks)
    } catch (error) {
      console.log("Error getting tasks", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTasks();
  }, []);

  // get task
  const getTask = async (taskId) => {
    setLoading(true);
    const uid=taskId
    try {
      const response = await axios.get(`${serverUrl}/api/task/${uid}`,{
        headers:{
            Authorization:'Bearer '+ token
        }
      });
      setTask(response.data.data);
    } catch (error) {
      console.log("Error getting task", error);
    }
    setLoading(false);
  };



  const createTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/task/create_task`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("Task created", res.data);
      setTasks([...tasks, res.data.data]);
      console.log(tasks)
      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
    }
    setLoading(false);
  };

  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${serverUrl}/api/task/edit/${task._id}`,
        task,
        {
          headers: {
             Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
       const newTasks = tasks.map((tsk) =>
         tsk._id === res.data.data._id ? res.data.data : tsk
       );
  
      toast.success("Task updated successfully");
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task", error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };
  

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/task/delete/${taskId}`,
        {
          headers: {
             Authorization: `Bearer ${token}`,
          },
        }
      );

      // remove the task from the tasks array
      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);

      setTasks(newTasks);
     } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  // get completed tasks
 const completedTasks = tasks.filter((task) =>task.completed);

  // get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed
);

  useEffect(() => {
    getTasks();
  }, [userId]);

useEffect(()=>{
  console.log(completedTasks)
},[])
  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        tasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        activeTasks,
        completedTasks,
        profileModal, 
        currentProject, 
        setCurrentProject  
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
