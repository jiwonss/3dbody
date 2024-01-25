import { Link, Outlet } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';

const BottomNavbar = () => {
  const [isSelected, setIsSelected] = useState("Home")

  const onClickSelected = (e) => (page) => {
    e.preventDefault()
    console.log(isSelected)
    setIsSelected(page)
  }


  return (
    <>
      <div>
        <Link to="/" onClick={onClickSelected("Home")}>
          <ChevronLeftIcon className={ isSelected === "Home" ? 'text-green-700' : 'text-red-700'}/>
        </Link>
        <Link to="/" onClick={onClickSelected("Diary")}>
          <ChevronLeftIcon className={ isSelected === "Diary" ? 'text-green-700' : 'text-red-700'}/>
        </Link>
        <Link to="/" onClick={onClickSelected("Challenge")}>
          <ChevronLeftIcon className={ isSelected === "Challenge" ? 'text-green-700' : 'text-red-700'}/>  
        </Link>
        <Link to="/" onClick={onClickSelected("MyPage")}>
          <ChevronLeftIcon className={ isSelected === "MyPage" ? 'text-green-700' : 'text-red-700'}/>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default BottomNavbar;
