"use client";
import { useProjects } from "@/context/projectContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import React, { useEffect } from "react";

function ProjectModal() {
  const {
    project,
    handleInput,
    createProject,
    isEditing,
    closeModal,
    modalMode,
    activeProject ,
    updateProject} = useProjects();
  const ref = React.useRef(null);

  // Use the hook to detect clicks outside the modal
  // useDetectOutside({
  //   ref,
  //   callback: () => {
  //     if (isEditing) {
  //       closeModal(); // Close modal if it is in add/edit mode
  //     }
  //   },
  // });

  useEffect(() => {
    if (modalMode === "edit" && activeProject) {
      handleInput("setProject")(activeProject);
    }
  }, [modalMode, activeProject]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalMode === "edit") {
      updateProject(project);
    } else if (modalMode === "add") {
      createProject(project);
    }
    closeModal();
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <form
        action=""
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={project.title || ""}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-[#F9F9F9] p-2 rounded-md border resize-none"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={project.description || ""}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
      
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="date"
            name="dueDate"
            value={project.dueDate || "" }
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Project" : "Create Project"}
          </button>
          <button
              className="mt-3 py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300"
              onClick={()=>closeModal()}
            >
              Cancel
            </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectModal;
