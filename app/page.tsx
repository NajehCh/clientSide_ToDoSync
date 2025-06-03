"use client";
import { useTasks } from "@/context/taskContext";
import { useProjects } from "@/context/projectContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task ,Project} from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";
import ProjectItem from "./Components/ProjectItem/ProjectItem";

import { useRouter } from "next/navigation"; // 🚨 pas "next/router" !

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority } = useTasks();
  const {projects,openModalForAddProject} = useProjects()
  const filtered = filteredTasks(tasks, priority);
  const router = useRouter();

  useEffect(() => {
   setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div>
  <h1 className="text-2xl font-bold">All Projects</h1>
  <motion.div
    className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
    variants={container}
    initial="hidden"
    animate="visible"
  >
    {projects.slice(0, 3).map((project: Project, i: number) => (
    <ProjectItem key={i} project={project} />
    ))}
   
    <motion.button
      className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
      hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
      onClick={openModalForAddProject}
      variants={item}
    >
      Add New Project
    </motion.button>
  </motion.div>
</div>


      
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </div>

       <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      > 
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
       
    </main>
  );
}