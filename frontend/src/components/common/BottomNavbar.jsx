import { Link, Outlet } from "react-router-dom";
import { CalendarDaysIcon, Cog6ToothIcon, HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';

const BottomNavbar = () => {
  const [isSelected, setIsSelected] = useState("Home")

  const onClickSelected = (page) => {
    setIsSelected(page)
  }

  return (
    <>
    <div className="fixed bottom-0 right-0 left-0">
      <div className='flex justify-between border-2 p-4 bg-white'>
        <Link to="/" onClick={() => onClickSelected("Home")}>
          <HomeIcon className={ `w-6 h-6 ${isSelected === "Home" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/" onClick={() => onClickSelected("Diary")}>
          <CalendarDaysIcon className={ `w-6 h-6 ${isSelected === "Diary" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/" onClick={() => onClickSelected("Challenge")}>
          <TrophyIcon className={ `w-6 h-6 ${isSelected === "Challenge" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/mypage" onClick={() => onClickSelected("MyPage")}>
          <Cog6ToothIcon className={ `w-6 h-6 ${isSelected === "MyPage" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
      </div>
    </div>
      <Outlet />
    </>
  );
};

export default BottomNavbar;