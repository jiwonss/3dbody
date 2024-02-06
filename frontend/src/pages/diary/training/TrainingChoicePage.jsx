import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import BackButton from "./../../../components/common/BackButton";
import PageTitle from "./../../../components/common/PageTitle";
import Button from "../../../components/common/Button";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import Search from "../../../components/common/Search";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { userState } from "../../../recoil/common/UserState";
import { selectedRoutineState } from "../../../recoil/diary/SelectedRoutineState";

const TrainingChoicePage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const [searchTraining, setSearchTraining] = useState("");
  const [searchTrainingList, setSearchTrainingList] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedTrainingList, setSelectedTrainingList] = useState([]);
  const { basepage } = useParams();
  const setSelectedRoutine = useSetRecoilState(selectedRoutineState);

  // 운동 검색명 저장
  const onChangeSearchTraining = (e) => {
    setSearchTraining(e.target.value);
  };
  // 운동 검색 데이터 가져오기
  const onSubmitGetSearchTraining = async (e) => {
    e.preventDefault();
    await axios
      .get(`${baseUrl}api/management/training/list?category=${category}&keyword=${searchTraining}`)
      .then((res) => {
        console.table(res.data);
        setSearchTrainingList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 운동 카테고리 별 리스트 가져오기
  const getSearchTraining = async () => {
    await axios
      .get(`${baseUrl}api/management/training/list?category=${category}&keyword=${searchTraining}`)
      .then((res) => {
        console.table(res.data);
        setSearchTrainingList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 카테고리 변경
  const onClickCategory = (e) => {
    if (category === e.target.innerText) {
      setCategory("");
    } else {
      setCategory(e.target.innerText);
    }
  };
  // 체크박스로 운동 저장
  const handleCheckboxChange = (trainingId) => {
    if (selectedTrainingList.includes(trainingId)) {
      setSelectedTrainingList(selectedTrainingList.filter((id) => id !== trainingId));
    } else {
      setSelectedTrainingList([...selectedTrainingList, trainingId]);
    }
  };
  // 운동 리스트에 추가하기
  const postTrainingList = async () => {
    await axios
      .post(
        `${baseUrl}api/management/training?user_id=${user.info.userId}&year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`,
        selectedTrainingList
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 루틴에 운동 리스트 저장 (로컬)
  const saveTrainingList = () => {
    setSelectedRoutine(selectedTrainingList)
  };
  // 페이지 로딩 시 전체 운동 리스트 가져오기
  useEffect(() => {
    getSearchTraining();
  }, [category]);

  return (
    <>
      <div className="sticky top-0 bg-white">
        <div className="absolute">
          <BackButton />
        </div>
        <PageTitle pageTitle="운동 선택하기" />
        {/* 검색 창 */}
        <Search
          onSubmit={onSubmitGetSearchTraining}
          onChange={onChangeSearchTraining}
          placeholder={`찾으시는 운동을 검색해보세요.`}
        />
        {/* 검색 카테고리 버튼 */}
        <div className="flex justify-between p-4">
          <Button
            btnCss={`basis-1/6 border rounded-xl ${
              category === "하체" ? "bg-gray-700 text-white" : ""
            }`}
            buttonName={"하체"}
            onClick={onClickCategory}
          />
          <Button
            btnCss={`basis-1/6 border rounded-xl ${
              category === "가슴" ? "bg-gray-700 text-white" : ""
            }`}
            buttonName={"가슴"}
            onClick={onClickCategory}
          />
          <Button
            btnCss={`basis-1/6 border rounded-xl ${
              category === "등" ? "bg-gray-700 text-white" : ""
            }`}
            buttonName={"등"}
            onClick={onClickCategory}
          />
          <Button
            btnCss={`basis-1/6 border rounded-xl ${
              category === "어깨" ? "bg-gray-700 text-white" : ""
            }`}
            buttonName={"어깨"}
            onClick={onClickCategory}
          />
          <Button
            btnCss={`basis-1/6 border rounded-xl ${
              category === "팔" ? "bg-gray-700 text-white" : ""
            }`}
            buttonName={"팔"}
            onClick={onClickCategory}
          />
        </div>
      </div>
      {/* 운동 리스트 */}
      <div className="flex flex-col gap-2 mx-4 mb-32">
        {searchTrainingList.map((data) => {
          return (
            <div className="flex flex-col gap-2" key={data.training_id}>
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(data.training_id)}
                  checked={selectedTrainingList.includes(data.training_id)}
                  className="w-6 ml-4"
                />
                <div className="flex gap-2 py-2 pl-4">
                  <img src="" alt="img" />
                  <p>{data.name}</p>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      {/* 하단 버튼 */}
      <div className="fixed w-full bg-white bottom-[57px]">
        <div
          className={`p-2 m-4 text-center border border-teal-700 rounded-md ${
            !selectedTrainingList.length ? "text-teal-700" : "bg-teal-700 text-white"
          }`}
        >
          {!selectedTrainingList.length ? (
            <Button buttonName="운동을 선택하세요" disabled />
          ) : (
            <Link
              to={
                basepage === "basic"
                  ? `/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`
                  : `/diary/training/myroutine/edit/create`
              }
            >
              <Button
                buttonName={`${"n"}개의 운동 추가하기`}
                onClick={() => {
                  basepage === "basic" ? postTrainingList() : saveTrainingList();
                }}
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default TrainingChoicePage;
