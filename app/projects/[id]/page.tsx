"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Task, Project } from "@/utils/types"; // adapte ce chemin si besoin
import TaskItem from "../../Components/TaskItem/TaskItem";
import { useProjects } from "@/context/projectContext";
import { motion } from "framer-motion";
import { useTasks } from "@/context/taskContext";
import { container, item } from "@/utils/animations";

export default function ProjectPage() {
  const { tasks, openModalForAdd, priority, setPriority } = useTasks();

  const { id } = useParams();
  const [tasksv, setTasksv] = useState<Task[]>([]);
  const { getTasksByProject, getProject, project } = useProjects();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      await getProject(id); // charge les détails du projet et met à jour "project"
      const fetchedTasks = await getTasksByProject(id);
      setTasksv(fetchedTasks);
    };

    fetchData();
    console.log(tasks)
  }, [id]);

  if (!project) return <p>Chargement du projet...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-4 text-gray-600">{project.description}</p>

      {tasks.length === 0 ? (
        <p className="text-gray-500">Aucune tâche pour ce projet.</p>
      ) : (
    <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]" variants={container}
          initial="hidden"
          animate="visible"
          >          
          {tasksv.map((tsk) => (
            <TaskItem key={tsk._id} task={tsk} />
          ))}
              <motion.button
                 className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
                 hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
                 onClick={openModalForAdd}
                 variants={item}
               >
                 Add New Task
               </motion.button>
      </motion.div>)}

    </div>
  );
}
