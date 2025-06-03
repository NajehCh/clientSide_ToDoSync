"use client";
import { useTasks } from "@/context/taskContext";
import { useProjects } from "@/context/projectContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task ,Project} from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";
import ProjectItem from "../Components/ProjectItem/ProjectItem";

import { useRouter } from "next/navigation"; // 🚨 pas "next/router" !

export default function Home() {
  useRedirect("/login");
  const router = useRouter();

  const {projects,openModalForAddProject} = useProjects()

  return (
    <main className="m-6 h-full">
      <div >
        <h1 className="text-2xl font-bold">All Projects</h1>
        <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      > 
        {projects.map((project: Project, i: number) => (
    <ProjectItem project={project} />
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
       
    </main>
  );
}