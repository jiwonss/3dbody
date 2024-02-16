import Menus from "../../components/mypage/Menus";
import Profile from "./../../components/mypage/Profile";

const MyPage = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div>
        <Profile />
        <hr className="bg-gray-500" />
        <Menus />
      </div>
    </div>
  );
};

export default MyPage;
