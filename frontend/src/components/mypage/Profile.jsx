import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/common/UserState";

const Profile = () => {
  const user = useRecoilValue(userState)
  const logout = () =>{
    localStorage.clear()
    window.location.reload("/")
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <img
          className="w-10 h-10 "
          src="src\assets\react.svg"
          alt="기본 이미지"
        />
      </div>
      <div className="flex justify-center">
        <p>{user.info.nickname}님</p>
        <Link to="/mypage/myinfo">
          <PencilSquareIcon className="w-6 h-6" />
        </Link>
      </div>
      <div className="flex justify-center">
        <Button buttonStyle={"small"} buttonName={"로그아웃"} onClick={logout} />
      </div>
    </div>
  );
};

export default Profile;
