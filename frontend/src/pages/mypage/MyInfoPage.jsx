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
      <MyInfo category="이름" data={user.info.name}/>
      <MyInfo category="닉네임" data={user.info.nickname} modalname="changeNickname"/>
      <MyInfo category="성별" data={user.info.gender==="MALE" ? "남자" : "여자"} modalname="changeGender"/>
      <MyInfo category="신장" data={user.info.height}/>
      <MyInfo category="체중" data={user.info.weight}/>
      <MyInfo category="생년월일" data={user.info.birth_date}/>
    </div>
  );
};

export default MyInfoPage;
