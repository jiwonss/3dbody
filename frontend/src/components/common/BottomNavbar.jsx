import { Link, Outlet } from "react-router-dom";
import { CalendarDaysIcon, Cog6ToothIcon, HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from 'recoil';
import { bottomNavState } from '../../recoil/common/BottomNavState';

const BottomNavbar = () => {
  const [isSelected, setIsSelected] = useRecoilState(bottomNavState)

  const onClickSelected = (page) => {
    setIsSelected(page)
  }

  return (
    <>
    <div className="fixed bottom-0 left-0 right-0">
      <div className='flex justify-between p-4 bg-white border-2'>
        <Link to="/home" onClick={() => onClickSelected("Home")}>
          <HomeIcon className={ `w-6 h-6 ${isSelected === "Home" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/diary" onClick={() => onClickSelected("Diary")}>
          <CalendarDaysIcon className={ `w-6 h-6 ${isSelected === "Diary" ? 'text-green-700' : 'text-red-700'}`}/>
        </Link>
        <Link to="/challenge" onClick={() => onClickSelected("Challenge")}>
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