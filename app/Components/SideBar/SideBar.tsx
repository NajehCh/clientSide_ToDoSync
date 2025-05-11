import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import ProfileModal from "../Profile/ProfileModal";
import { useUserContext } from "@/context/userContext";
import { useTasks } from "@/context/taskContext";
import { Menu, X } from "lucide-react"; // icônes menu et croix

function Sidebar() {
  const { logOutUser } = useUserContext();
  const { profileModal } = useTasks();

  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Détecter les dimensions de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 961);
    };

    handleResize(); // vérification initiale
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const handleOverlayClick = () => setShowSidebar(false);

  return (
    <>
      {/* Bouton toggle mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 bg-[#EB4E31] p-3 rounded-full text-white shadow-lg"
        >
          {showSidebar ? <X /> : <Menu />}
        </button>
      )}

      {/* Overlay + Sidebar sur mobile */}
      {isMobile && showSidebar && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 z-40 flex justify-center items-center bg-gray-200/30 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div
            className="w-[320px] h-[90%] bg-white/90 rounded-xl shadow-xl p-4 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <Profile />
              {profileModal && <ProfileModal />}
              <div className="mt-4">
                <RadialChart />
              </div>
            </div>
            <button
              className="py-3 px-6 bg-[#EB4E31] text-white rounded-full hover:bg-[#3aafae] transition duration-200 ease-in-out"
              onClick={logOutUser}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Sidebar normale sur bureau */}
      {!isMobile && (
        <div className="w-[320px] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-[#f9f9f9] flex flex-col justify-between">
          <div>
            <Profile />
            {profileModal && <ProfileModal />}
            <div className="mt-4 mx-6">
              <RadialChart />
            </div>
          </div>
          <button
            className="mt-auto mb-6 mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
            onClick={logOutUser}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
