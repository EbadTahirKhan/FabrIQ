import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaPlus,
  FaArchive,
  FaBox,
  FaUserFriends,
  FaCog,
  FaBars,
} from "react-icons/fa";
import { sidebarItems } from "../assets/sidebarData";
import { Link } from "react-router-dom";

function Sidebar({ panelType }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Map icon names to actual components
  const iconComponents = {
    FaHome,
    FaPlus,
    FaArchive,
    FaBox,
    FaUserFriends,
    FaCog,
  };

  // Get the sidebar items for the current panelType
  const currentSidebarItems = sidebarItems[panelType];

  // Extract icons from currentSidebarItems
  const sidebarIcons = currentSidebarItems
    .filter((item) => item.type === "link") // Only include links (not headings)
    .map((item) => item.icon); // Extract the icon names

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sidebarRef}>
      {/* Toggle button for all screen sizes */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-br from-slate-100/30 to-slate-500/50 shadow-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 p-2 rounded-full flex items-center justify-center flex-col gap-4 text-slate-600 hover:text-gray-800"
        >
          {!isOpen ? (
            <>
              <div className="flex flex-col gap-4">
                <FaBars className="text-inherit" />
                {sidebarIcons.map((iconName, index) => {
                  const IconComponent = iconComponents[iconName];
                  return <IconComponent key={index} className="text-inherit" />;
                })}
              </div>
            </>
          ) : (
            <FaBars className="text-inherit " />
          )}
        </button>
      </div>

      {/* Main sidebar */}
      <div
        className={`bg-gradient-to-br from-slate-100/30 to-slate-500/40 shadow-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 h-screen w-[60%] max-w-xs lg:min-w-[250px] rounded-l-xl fixed top-0 z-40 flex items-center justify-center flex-col gap-4 p-4 px-5 rounded-r-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <ul className="absolute right-8 -translate-y-[50%] w-[80%] h-[85%] flex flex-col justify-center">
            <div className="text-2x text-neutral-800 font-extrabold tracking-wide">
              {panelType
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </div>
            <hr className="text-neutral-600 mt-3 border-neutral-400 mr-20" />

            {currentSidebarItems.map((item, index) => {
              if (item.type === "heading") {
                return (
                  <h1
                    key={index}
                    className="text-neutral-800 font-extrathin text-xs my-4 lg:my-3 lg:ml-0"
                  >
                    {item.text}
                  </h1>
                );
              } else if (item.type === "link") {
                const IconComponent = iconComponents[item.icon];
                return (
                  <li key={index} className={item.className}>
                    <Link
                      className="lg:ml-[5%]"
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="inline-block mr-2" />
                      {item.text}
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
