import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/common/UserState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Button from "./../../components/common/Button";
// import uuid from "react-uuid";
// import AWS from "aws-sdk";

const ChallengeRegistrationPage = () => {
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeSummary, setChallengeSummary] = useState("");
  const [challengeContent, setChallengeContent] = useState("");
  const [challengeThumnail, setChallengeThumnail] = useState("");
  const [challengeImage, setChallengeImage] = useState("");
  const date = new Date().toISOString().slice(0, 10);
  const [challengeStartDate, setChallengeStartDate] = useState(`${date}T00:00`);
  const [challengeEndDate, setChallengeEndDate] = useState(`${date}T00:00`);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  // const region = "ap-northeast-2"; // S3 지역 이름
  // const bucket = "3dbody-image"; // S3 버킷 이름
  // const [files, setFiles] = useState("");

  // AWS.config.update({
  //   region: region,
  //   accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
  //   secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  // });

  // console.log("env,", import.meta.env.AWS_CONFIG)

  const onChallengeTitleHandler = (event) => {
    setChallengeTitle(event.currentTarget.value);
  };
  const onChallengeSummaryHandler = (event) => {
    setChallengeSummary(event.currentTarget.value);
  };
  const onChallengeContentHandler = (event) => {
    setChallengeContent(event.currentTarget.value);
  };
  const onChallengeThumnailHandler = (event) => {
    setChallengeThumnail(event.currentTarget.value);
  };
  const onChallengeImageHandler = (event) => {
    setChallengeImage(event.currentTarget.value);
  };
  const onChallengeStartDateHandler = (event) => {
    setChallengeStartDate(event.currentTarget.value);
  };
  const onChallengeEndDateHandler = (event) => {
    setChallengeEndDate(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // setFiles(challengeThumnail);
    console.log(challengeThumnail);
    await axios
      .post(`${baseUrl}api/challenge`, {
        title: challengeTitle,
        summary: challengeSummary,
        content: challengeContent,
        thumbnail: challengeThumnail,
        image: challengeImage,
        start_date: challengeStartDate,
        end_date: challengeEndDate,
        user_id: user.info.userId,
      })
      .then(() => {
        window.location.replace("/challenge");
      });

    // const upload = new AWS.S3.ManagedUpload({
    //   params: {
    //     Bucket: bucket,
    //     Key: uuid(), //uuid
    //     Body: files,
    //   },
    // });

    // const promise = upload.promise();
    // promise.then(
    //   function () {
    //     window.setTimeout(function () {
    //       location.reload();
    //     }, 2000);
    //   },
    //   function (err) {
    //     console.log(err);
    //   }
    // );
  };

  return (
    <div>
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
          <label>썸네일</label>
          <input
            type="file"
            value={challengeThumnail}
            onChange={onChallengeThumnailHandler}
            className="border-2"
          />
        </div>
        <div>
          <label>전체 포스터</label>
          <input
            type="file"
            value={challengeImage}
            onChange={onChallengeImageHandler}
            className="border-2"
          />
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

export default ChallengeRegistrationPage;
