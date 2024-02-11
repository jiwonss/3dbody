import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/common/UserState";
import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import * as AWS from "@aws-sdk/client-s3";
import axios from "axios";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const Profile = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const [user, setUser] = useRecoilState(userState);
  const [profile, setProfile] = useState({});
  const [profileName, setProfileName] = useState("");
  // 프로필 업로드 관련 useEffect 첫 마운트 시 막기 위해서 쓸 변수
  const [isChange, setIsChange] = useState(false);
  const fileInput = useRef(null);
  const region = "ap-northeast-2"; // S3 지역 이름
  const bucket = "3dbody-image"; // S3 버킷 이름

  const logout = () => {
    localStorage.clear();
    window.location.reload("/");
  };

  const awsUpdate = new AWS.S3Client({
    region: region,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
   },
  });

  // 이미지 업로드 시 상태 변경과 useEffect 실행 위한 상태도 변경
  const onProfileUpdate = async (event) => {
    console.log("프로필 변경")
    if (event.target.files[0]) {
      setProfile(event.target.files[0]);
      setProfileName(`${uuid()}_${event.currentTarget.files[0].name}`);
      setIsChange(true);
    } else {
      setIsChange(false);
      return;
    }
  };

  useEffect(() => {
    let extension = ""; // 확장자 구별
    if (isChange) {
      if (profileName.includes("jpg") || profileName.includes("jpeg")) {
        extension = "image/jpeg";
      } else if (profileName.includes("png")) {
        extension = "image/png";
      } else if (profileName.includes("gif")) {
        extension = "image/gif";
      }
      const params = {
        Bucket: bucket,
        Key: profileName,
        Body: profile,
        ContentType: extension,
       };

       awsUpdate.send(new AWS.PutObjectCommand(params)).then(() => {
        axios({
          method: "patch",
          url: `${baseUrl}api/users/${user.info.userId}/profile-image`,
          headers: { Authorization: `Bearer ${user.token}` },
          data: {
            profile_image: `https://do9nz79ez57wg.cloudfront.net/${profileName}`,
          },
        }).then((res) => {
          if (res.data.data_header.success_code === 0) {
            setUser({
              token: user.token,
              info: {
                ...user.info,
                profile_image: `https://do9nz79ez57wg.cloudfront.net/${profileName}`,
              },
            });
          }
        });
      });
    } else {
      console.log(false);
    }
  }, [profile]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <input
          type="file"
          className="hidden"
          accept="image/jpg,image/png,image/jpeg"
          name="profile_img"
          onChange={onProfileUpdate}
          ref={fileInput}
        />
        <img
          className="w-1/4 m-2 border rounded-full object-fit:corver"
          src={user.info.profile_image}
          alt="기본 이미지"
          onClick={() => {
            fileInput.current.click();
          }}
        />
      </div>
      <div className="flex justify-center gap-2 m-2">
        <h3><span className="font-semibold">{user.info.nickname}</span>님</h3>
        <Link to="/mypage/myinfo">
          <PencilSquareIcon className="w-6 h-6" />
        </Link>
      </div>
      <div className="flex justify-center m-2">
        <Button
          btnCss={"px-2 py-1 border rounded-md border-teal-700"}
          buttonName={"로그아웃"}
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Profile;
