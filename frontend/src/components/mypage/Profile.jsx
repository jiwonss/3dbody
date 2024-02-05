import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/common/UserState";
import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import AWS from "aws-sdk";
import axios from "axios";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const Profile = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const [user, setUser] = useRecoilState(userState);
  const [profile, setProfile] = useState({});
  const [profileName, setProfileName] = useState("");
  const fileInput = useRef(null);
  const region = "ap-northeast-2"; // S3 지역 이름
  const bucket = "3dbody-image"; // S3 버킷 이름
  let extension = ""; // 확장자 구별
  const logout = () => {
    localStorage.clear();
    window.location.reload("/");
  };

  AWS.config.update({
    region: region,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  });

  // S3 아직 하는중
  const onProfileUpdate = async (event) => {
    console.log(event);
    if (event.target.files[0]) {
      setProfile(event.target.files[0]);
      setProfileName(`${uuid()}_${event.currentTarget.files[0].name}`);
    } else {
      return;
    }
    if (profileName.includes("jpg") || profileName.includes("jpeg")) {
      extension = "image/jpeg";
    } else if (profileName.includes("png")) {
      extension = "image/png";
    } else if (profileName.includes("gif")) {
      extension = "image/gif";
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: profileName,
        Body: profile,
        ContentType: extension,
      },
    });
    const promise = upload.promise();
    promise.then(() => {
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

      console.log("성공");
    });
  };

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
          className="w-10 h-10 m-2"
          src={user.info.profile_image}
          alt="기본 이미지"
          onClick={() => {
            fileInput.current.click();
          }}
        />
      </div>
      <div className="flex justify-center">
        <p>{user.info.nickname}님</p>
        <Link to="/mypage/myinfo">
          <PencilSquareIcon className="w-6 h-6" />
        </Link>
      </div>
      <div className="flex justify-center">
        <Button
          buttonStyle={"small"}
          buttonName={"로그아웃"}
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Profile;
