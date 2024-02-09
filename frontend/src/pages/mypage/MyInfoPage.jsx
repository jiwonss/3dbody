import { useRecoilValue } from "recoil";
import BackButton from "./../../components/common/BackButton";
import { userState } from "../../recoil/common/UserState";
import MyInfo from "../../components/mypage/MyInfo";
import PageTitle from "../../components/common/PageTitle";

const MyInfoPage = () => {
  const user = useRecoilValue(userState);
  return (
    <div>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="회원 정보 수정" />
      <MyInfo category="이메일" data={user.info.email}/>
      <MyInfo category="이름" data={user.info.name}/>
      <MyInfo category="닉네임" data={user.info.nickname} modalname="changeNickname"/>
      <MyInfo category="성별" data={user.info.gender==="MALE" ? "남자" : "여자"} modalname="changeGender"/>
      <MyInfo category="신장" data={user.info.height} modalname="changeHeight"/>
      <MyInfo category="체중" data={user.info.weight} modalname="changeWeight"/>
      <MyInfo category="생년월일" data={user.info.birth_date}/>
    </div>
  );
};

export default MyInfoPage;
