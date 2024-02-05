import { NavLink, Outlet } from "react-router-dom";
import { CalendarDaysIcon, Cog6ToothIcon, HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";

const BottomNavbar = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0">
        <div className="flex justify-between p-4 bg-white border-t-2">
          <NavLink to="/">
            <HomeIcon className={`w-6 h-6`} />
          </NavLink>
          <NavLink to="/diary">
            <CalendarDaysIcon className={`w-6 h-6 `} />
          </NavLink>
          <NavLink to="/challenge">
            <TrophyIcon className={`w-6 h-6 `} />
          </NavLink>
          <NavLink to="/mypage">
            <Cog6ToothIcon className={`w-6 h-6 `} />
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default BottomNavbar;
