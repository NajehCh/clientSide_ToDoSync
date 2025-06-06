"use client";
import { useTasks } from "@/context/taskContext";
import { useProjects } from "@/context/projectContext";
import { Task,Project } from "@/utils/types";

import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Hand } from 'lucide-react';
import Modal from "../Modal/Modal"
import ProjectModal from "../ProjectModal/ProjectModal";

interface ProjectItemProps {
  project: Project;
}
interface ProjectItemProps {
  project: Project;
}

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd ,activeTask,activeTasks, isEditing } = useTasks();
  const { openModalForAddProject, activeProject, isEditingProject } = useProjects();


  const router = useRouter();

  const { name } = user;

  const userId = user._id;

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className="text-lg font-medium">
        <span className="wave-emoji">👋</span>

          {userId ? `Welcome, ${name}!` : "Welcome to TodoSync"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
               {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();

            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "New Task" : "Login"}
        </button>

        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAddProject();
            } else {
              router.push("/register");
            }
          }}
        >
          {userId ? "New Project" : "Register"}
        </button>

        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/NajehCh"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>
          <Link
            href="https://github.com/NajehCh"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {moon}
          </Link>
          <Link
            href="https://github.com/NajehCh"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {profile}
          </Link>
        </div>
        {/* Affichage conditionnel du modal */}
      {isEditing  &&  <Modal project={activeProject} />}
      {isEditingProject && <ProjectModal />}

      </div>
    </header>
  );
}

export default Header;