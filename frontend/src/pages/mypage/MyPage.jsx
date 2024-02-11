import Menus from "../../components/mypage/Menus";
import Profile from "./../../components/mypage/Profile";

const MyPage = () => {
  return (
    <div className="m-4">
      <Profile />
      <hr className="mt-4 border"/>
      <Menus />
    </div>
  );
};

export default MyPage;
