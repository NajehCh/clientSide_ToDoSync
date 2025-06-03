"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { TasksProvider } from "../context/taskContext";
import { ProjectsProvider } from "../context/projectContext"; // ✅ IMPORTER CE CONTEXTE

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return (
    <UserContextProvider>
      <ProjectsProvider> {/* ✅ AJOUTER CE WRAPPER */}
        <TasksProvider>
          {children}
        </TasksProvider>
      </ProjectsProvider>
    </UserContextProvider>
  );
}

export default UserProvider;
