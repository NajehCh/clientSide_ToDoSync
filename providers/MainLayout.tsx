"use client";
import Modal from "@/app/Components/Modal/Modal";
import ProfileModal from "@/app/Components/Profile/ProfileModal";
import { useTasks } from "@/context/taskContext";
import ProjectModal from "@/app/Components/ProjectModal/ProjectModal"
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { isEditing, profileModal ,currentProject} = useTasks();
  return (
    <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto">
      {isEditing && currentProject && <Modal project={currentProject} />}
      {profileModal && <ProfileModal />}
      {ProjectModal && <ProjectModal />}

      {children}
    </div>
  );
}

export default MainLayout;