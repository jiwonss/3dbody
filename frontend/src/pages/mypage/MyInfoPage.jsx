import { useRecoilValue } from "recoil";
import BackButton from "./../../components/common/BackButton";
import { userState } from "../../recoil/common/UserState";
import MyInfo from "../../components/mypage/MyInfo";

const MyInfoPage = () => {
  const user = useRecoilValue(userState);
  console.log(user)
  return (
    <div>
      <BackButton />
      <MyInfo category="이메일" data={user.info.email}/>
      <MyInfo category="닉네임" data={user.info.nickname} modalname="changeNickname"/>
      <MyInfo category="성별" data={"남자"} modalname="changeGender"/>
      <MyInfo category="신장" data={user.info.email}/>
      <MyInfo category="체중" data={user.info.email}/>
    </div>
  );
};

export default MyInfoPage;
