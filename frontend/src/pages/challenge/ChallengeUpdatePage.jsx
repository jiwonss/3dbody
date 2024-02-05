import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/common/UserState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Button from "./../../components/common/Button";
import uuid from "react-uuid";
import AWS from "aws-sdk";
import BackButton from "./../../components/common/BackButton";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const ChallengeUpdatePage = () => {
  const { challengeId } = useParams();
  // const [challenge, setChallenge] = useState({});
  // console.log(challenge.start_date)
  const location = useLocation();
  const challenge = location.state.value

  const [challengeTitle, setChallengeTitle] = useState(`${challenge.title}`);
  const [challengeSummary, setChallengeSummary] = useState(
    `${challenge.summary}`
  );
  const [challengeContent, setChallengeContent] = useState(
    `${challenge.content}`
  );
  const [challengeStartDate, setChallengeStartDate] = useState(
    `${challenge.start_date}`
  );
  const [challengeEndDate, setChallengeEndDate] = useState(
    `${challenge.end_date}`
  );
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const region = "ap-northeast-2"; // S3 지역 이름
  const bucket = "3dbody-image"; // S3 버킷 이름
  let extension = ""; // 확장자 구별
  const [thumbnail, setThumbnail] = useState({}); // 썸네일 파일
  const [thumbnailName, setThumbnailName] = useState(""); // 썸네일 이름
  const [image, setImage] = useState({}); // 이미지 파일
  const [imageName, setImageName] = useState(""); // 이미지 이름

  AWS.config.update({
    region: region,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  });

  // const getChallenge = async () => {
  //   const res = (
  //     await axios.get(`${baseUrl}api/challenge/detail/${challengeId}`)
  //   ).data;
  //   setChallenge(res);
  // };
  // console.log(challenge)
  const onChallengeThumnailHandler = (event) => {
    setThumbnail(event.currentTarget.files[0]);
    setThumbnailName(`${uuid()}_${event.currentTarget.files[0].name}`); //uuid => 난수 설정
  };
  const onChallengeImageHandler = (event) => {
    setImage(event.currentTarget.files[0]);
    setImageName(`${uuid()}_${event.currentTarget.files[0].name}`); //uuid => 난수 설정
  };
  const onChallengeTitleHandler = (event) => {
    setChallengeTitle(event.currentTarget.value);
  };
  const onChallengeSummaryHandler = (event) => {
    setChallengeSummary(event.currentTarget.value);
  };
  const onChallengeContentHandler = (event) => {
    setChallengeContent(event.currentTarget.value);
  };
  const onChallengeStartDateHandler = (event) => {
    if (event.currentTarget.value > challengeEndDate) {
      alert("종료일이 시작일보다 빠릅니다.");
    } else {
      setChallengeStartDate(event.currentTarget.value);
    }
  };
  const onChallengeEndDateHandler = (event) => {
    if (event.currentTarget.value < challengeStartDate) {
      alert("종료일이 시작일보다 빠릅니다.");
    } else {
      setChallengeEndDate(event.currentTarget.value);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .put(`${baseUrl}api/challenge/${challengeId}`, {
        thumbnail: `https://do9nz79ez57wg.cloudfront.net/${thumbnailName}`,
        image: `https://do9nz79ez57wg.cloudfront.net/${imageName}`,
        title: challengeTitle,
        summary: challengeSummary,
        content: challengeContent,
        start_date: challengeStartDate,
        end_date: challengeEndDate,
        user_id: user.info.userId,
      })
      .then(() => {
        window.location.replace("/challenge");
      });
  };

  // S3 에 넣기
  const onChallengeThumnailSubmitHandler = async (event) => {
    event.preventDefault();
    if (thumbnailName.includes("jpg") || thumbnailName.includes("jpeg")) {
      extension = "image/jpeg";
    } else if (thumbnailName.includes("png")) {
      extension = "image/png";
    } else if (thumbnailName.includes("gif")) {
      extension = "image/gif";
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: thumbnailName,
        Body: thumbnail,
        ContentType: extension,
      },
    });
    const promise = upload.promise();
    promise.then(() => {
      console.log("성공");
    });
  };

  // S3 에 넣기
  const onChallengeImageSubmitHandler = async (event) => {
    event.preventDefault();
    if (imageName.includes("jpg") || imageName.includes("jpeg")) {
      extension = "image/jpeg";
    } else if (imageName.includes("png")) {
      extension = "image/png";
    } else if (imageName.includes("gif")) {
      extension = "image/gif";
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: imageName,
        Body: image,
        ContentType: extension,
      },
    });
    const promise = upload.promise();
    promise.then(() => {
      console.log("성공");
    });
  };

  // useEffect(() => {
  //   getChallenge();
  // }, []);

  return (
    <div>
      <BackButton />
      <form onSubmit={onChallengeThumnailSubmitHandler}>
        <label>썸네일</label>
        <input
          type="file"
          className="border-2"
          onChange={onChallengeThumnailHandler}
        />
        <button type="submit">등록</button>
      </form>
      <form onSubmit={onChallengeImageSubmitHandler}>
        <label>전체 포스터</label>
        <input
          type="file"
          className="border-2"
          onChange={onChallengeImageHandler}
        />
        <button type="submit">등록</button>
      </form>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={challengeTitle}
            onChange={onChallengeTitleHandler}
            className="border-2"
          />
        </div>
        <div>
          <label>한줄 설명</label>
          <input
            type="text"
            value={challengeSummary}
            onChange={onChallengeSummaryHandler}
            className="border-2"
          />
        </div>
        <div>
          <label>상세 설명</label>
          <textarea
            cols="30"
            rows="5"
            value={challengeContent}
            onChange={onChallengeContentHandler}
            className="border-2"
          ></textarea>
        </div>
        <br />
        <div>
          <label>시작일</label>
          <input
            type="datetime-local"
            value={challengeStartDate}
            onChange={onChallengeStartDateHandler}
            className="border-2"
          />
        </div>
        <div>
          <label>종료일</label>
          <input
            type="datetime-local"
            value={challengeEndDate}
            onChange={onChallengeEndDateHandler}
            className="border-2"
          />
        </div>
        <Button type={"submit"} buttonName={"등록하기"} />
      </form>
    </div>
  );
};

export default ChallengeUpdatePage;
 