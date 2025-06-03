"use client";
import { useRouter } from "next/navigation"; // <-- ✅ Importer
import { useProjects } from "@/context/projectContext";
import { edit, trash } from "@/utils/Icons";
import { Project } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface ProjectItemProps {
  project: Project;
}

function ProjectItem({ project }: ProjectItemProps) {
  const router = useRouter(); 
  const { getProject, openModalForEditProject, deleteProject } = useProjects();
  const projectId = project?._id;

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{project?.title}</h4>
        <p>{project?.description}</p>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(project?.createdAt)}</p>
        <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
          <button
            className="text-[#00A1F1]"
            onClick={() => {
              getProject(projectId);
              openModalForEditProject(project);
            }}
          >
            {edit}
          </button>
          <button
            className="text-[#F65314]"
            onClick={() => {
              deleteProject(project._id);
            }}
          >
            {trash}
          </button>
        </div>
      </div>

      {/* ✅ Bouton "More" pour redirection */}
      <button
        onClick={() => router.push(`/projects/${project._id}`)}
        className="mt-2 text-sm text-blue-600 hover:underline self-end"
      >
        More →
      </button>
    </motion.div>
  );
}

export default ProjectItem;
