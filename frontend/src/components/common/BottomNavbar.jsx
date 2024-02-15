import { NavLink, Outlet } from "react-router-dom";
import { CalendarDaysIcon as SolidCalendarDaysIcon, Cog6ToothIcon as SolidCog6ToothIcon, HomeIcon as SolidHomeIcon, TrophyIcon as SolidTrophyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CalendarDaysIcon, Cog6ToothIcon, HomeIcon, TrophyIcon } from "@heroicons/react/24/outline";

const BottomNavbar = () => {
  const [selectedIcon, setSelectedIcon] = useState("")

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0">
        <div className="flex justify-between p-4 bg-white border-t-2">
          <NavLink to="/" >
            <SolidHomeIcon className={`w-6 h-6 ${selectedIcon === "home" ? "" : "hidden"}`} />
            <HomeIcon className={`w-6 h-6 ${selectedIcon === "home" ? "hidden" : ""}`} onClick={() => setSelectedIcon("home")} />
          </NavLink>
          <NavLink to="/diary">
            <SolidCalendarDaysIcon className={`w-6 h-6 ${selectedIcon === "diary" ? "" : "hidden"}`} />
            <CalendarDaysIcon className={`w-6 h-6 ${selectedIcon === "diary" ? "hidden" : ""}`} onClick={() => setSelectedIcon("diary")} />
          </NavLink>
          <NavLink to="/challenge">
            <SolidTrophyIcon className={`w-6 h-6 ${selectedIcon === "challenge" ? "" : "hidden"}`} />
            <TrophyIcon className={`w-6 h-6 ${selectedIcon === "challenge" ? "hidden" : ""}`} onClick={() => setSelectedIcon("challenge")} />
          </NavLink>
          <NavLink to="/mypage">
            <SolidCog6ToothIcon className={`w-6 h-6 ${selectedIcon === "mypage" ? "" : "hidden"}`} />
            <Cog6ToothIcon className={`w-6 h-6 ${selectedIcon === "mypage" ? "hidden" : ""}`} onClick={() => setSelectedIcon("mypage")} />
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default BottomNavbar;
