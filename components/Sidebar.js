import React, { useState } from "react";

import { PostWidget, LatestWidget, Categories } from "../components";
const Sidebar = ({ location }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed right-10 top-3/4 transform -translate-y-1/2 
                 z-50 bg-pink-600 hover:bg-indigo-900 text-white font-bold 
                 py-2 px-4 rounded"
      >
        {isSidebarOpen ? "→" : "←"}
      </button>

      <div
        className={`transition-transform duration-300 flex flex-col justify-center ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:col-span-4 col-span-1 fixed right-0 top-0 h-full`}
      >
        <div className="text-xl bg-pink-600 p-2 rounded-full text-white text-center font-semibold mt-2 mb-4 mr-8">
          Sidebar
        </div>
        <div className="lg:sticky relative top-8">
          {location == "categoryslug" ? (
            <></>
          ) : (
            <div className="embossed mb-4 mr-8 p-4">
              <PostWidget />
            </div>
          )}
          {location == "podcasts" ? (
            <div className="embossed mb-4 mr-8 p-4">
              <LatestWidget />
            </div>
          ) : (
            <></>
          )}
          <div className="embossed mr-8">
            <Categories />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
