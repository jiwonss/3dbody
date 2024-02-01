import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/common/UserState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Button from "./../../components/common/Button";
import uuid from "react-uuid";
import AWS from "aws-sdk";

const ChallengeUpdatePage = () => {
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeSummary, setChallengeSummary] = useState("");
  const [challengeContent, setChallengeContent] = useState("");
  const date = new Date().toISOString().slice(0, 10);
  const [challengeStartDate, setChallengeStartDate] = useState(`${date}T00:00`);
  const [challengeEndDate, setChallengeEndDate] = useState(`${date}T00:00`);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const region = "ap-northeast-2"; // S3 지역 이름
  const bucket = "3dbody-image"; // S3 버킷 이름

  AWS.config.update({
    region: region,
    accessKeyId: 'AKIAQ3EGP36XZXYPTXHB',
    secretAccessKey: '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',
  });

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
    const file = event.target[3].files[0];
    await axios.post(
      `${baseUrl}api/challenge`,
      {
        title: challengeTitle,
        summary: challengeSummary,
        content: challengeContent,
        start_date: challengeStartDate,
        end_date: challengeEndDate,
        user_id: user.info.userId,
      },
      {
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "multipart/form-data", // 이거하면 400 error
        },
      }
    );

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: `${uuid()}_${file.name}`, //uuid
        Body: file,
      },
    });

    const promise = upload.promise();
    promise.then(() => {
      window.location.replace("/challenge");
    });
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
          <label>포스터</label>
          <input type="file" className="border-2" />
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