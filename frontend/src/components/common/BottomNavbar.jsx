import { Link, Outlet } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';

const BottomNavbar = () => {
  const [isSelected, setIsSelected] = useState("Home")

  const onClickSelected = (page) => {
    setIsSelected(page)
  }

  return (
    <>
      <div className='flex'>
        <Link to="/" onClick={() => onClickSelected("Home")}>
          <ChevronLeftIcon className={ `w-6 h-6 ${isSelected === "Home" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/" onClick={() => onClickSelected("Diary")}>
          <ChevronLeftIcon className={ `w-6 h-6 ${isSelected === "Diary" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/" onClick={() => onClickSelected("Challenge")}>
          <ChevronLeftIcon className={ `w-6 h-6 ${isSelected === "Challenge" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/" onClick={() => onClickSelected("MyPage")}>
          <ChevronLeftIcon className={ `w-6 h-6 ${isSelected === "MyPage" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default BottomNavbar;
