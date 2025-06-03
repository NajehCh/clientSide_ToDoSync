import axios from "axios";
import React, { createContext, useEffect,useState } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const ProjectsContext = createContext();
const serverUrl= process.env.NEXT_PUBLIC_SERVER_URL

export const ProjectsProvider = ({ children }) => {


  const userId = useUserContext().user._id;
  const {token}=useUserContext()

  const initialProject = {
    title: "",
    description: "",
    dueDate: "", 
    _id: "", 
  };
  
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [project, setProject] = useState(initialProject);
  const [isEditingProject, setIsEditingProject] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  

  const openModalForAddProject = () => {
    setModalMode("add");
    setIsEditingProject(true);
    setProject(initialProject);
  };

  const openModalForEditProject = (project) => {
    setModalMode("edit");
    setIsEditingProject(true);
    setActiveProject(project);
  };

  const closeModal = () => {
    setIsEditingProject(false);
    setModalMode("");
    setActiveProject(null);
    setProject(initialProject);
  };

   useEffect(() => {
     getProjects();
   }, []);
  // get  all projects 
  const getProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/api/projects/user/all`,{
        headers:{
            Authorization:'Bearer '+token
        }
    });
      setProjects(response.data.data);
      console.log('project',projects)
    } catch (error) {
      console.log("Error getting projects", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProjects();
  }, []);

  // get task
  const getProject = async (projectId) => {
    setLoading(true);
    const uid=projectId
    try {
      const response = await axios.get(`${serverUrl}/api/projects/${uid}`,{
            headers:{
            Authorization:'Bearer '+ token
        }
      });
      setProject(response.data.data);
    } catch (error) {
      console.log("Error getting projects", error);
    }
    setLoading(false);
  };



  const createProject = async (project) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/projects/create_project`,
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("project created", res.data);
      setProjects([...projects, res.data.data]);
      console.log(projects)
      toast.success("projects created successfully");
    } catch (error) {
      console.log("Error creating project", error);
    }
    setLoading(false);
  };

  const updateProject = async (project) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${serverUrl}/api/projects/edit_project/${project._id}`,
        project,
        {
          headers: {
             Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
       const newProjects = projects.map((prt) =>
        prt._id === res.data.data._id ? res.data.data : prt
       );
  
      toast.success("project updated successfully");
      setProjects(newProjects);
    } catch (error) {
      console.error("Error updating project", error);
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject= async (projectId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/projects/delete_project/${projectId}`,
        {
          headers: {
             Authorization: `Bearer ${token}`,
          },
        }
      );

      // remove the task from the tasks array
      const newProjects = projects.filter((prt) => prt._id !== projectId);

      setProjects(newProjects);
     } catch (error) {
      console.log("Error deleting project", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setProject") {
      setProject(e);
    } else {
      setProject({ ...project, [name]: e.target.value });
    }
  };
  const getTasksByProject = async (projectId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/api/projects/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const tasks = response.data.data;
      console.log("Tasks for project", tasks);
  
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks by project", error);
      toast.error("Erreur lors de la récupération des tâches");
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    getProjects();
  }, [userId]);

  return (
    <ProjectsContext.Provider
      value={{
        getTasksByProject,
        projects,
        loading,
        deleteProject,
        handleInput,
        createProject,
        getProject,
        project,
        openModalForAddProject,
        activeProject,setActiveProject,modalMode,openModalForEditProject,closeModal,updateProject,activeProject,isEditingProject,setIsEditingProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  return React.useContext(ProjectsContext);
};
