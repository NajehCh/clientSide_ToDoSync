"use client";
import Sidebar from "@/app/Components/SideBar/SideBar";
import { useUserContext } from "@/context/userContext";
import React from "react";

function SidebarProvider() {
  const userId = useUserContext().user._id;
  return <>{userId && <Sidebar />}</>;
}

export default SidebarProvider;