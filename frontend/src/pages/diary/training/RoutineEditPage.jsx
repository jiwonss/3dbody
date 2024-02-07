import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PageTitle from "./../../../components/common/PageTitle";
import Button from "../../../components/common/Button";
import { selectedRoutineState } from "../../../recoil/diary/SelectedRoutineState";
import Input from "../../../components/common/Input";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { selectedRoutineTrainingState } from "../../../recoil/diary/SelectedRoutineTrainingState";
import axios from "axios";
import { selectedRoutineInfoState } from "../../../recoil/diary/SelectedRoutineInfoState";

const RoutineEditPage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const [selectedRoutine, setSelectedRoutine] = useRecoilState(selectedRoutineState);
  const [selectedRoutineTraining, setSelectedRoutineTraining] = useRecoilState(
    selectedRoutineTrainingState
  );
  const selecetedRoutineInfo = useRecoilValue(selectedRoutineInfoState);
  const [title, setTitle] = useState(selecetedRoutineInfo.title);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 선택한 루틴 정보 가져오기
  const getRoutineDetail = async () => {
    await axios
      .get(`${baseUrl}api/management/routine/detail/${selecetedRoutineInfo.routineId}`)
      .then((res) => {
        console.log("루틴 디테일", res);
        setSelectedRoutine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 루틴명 변경
  const putRoutineTitle = async () => {
    await axios
      .patch(
        `${baseUrl}api/management/routine/update/${selecetedRoutineInfo.routineId}?title=${title}`
      )
      .then((res) => {
        console.log("루틴명 변경" + title);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //루틴 운동 추가
  const postRoutineTrainingList = async () => {
    if (selectedRoutineTraining.length) {
      await axios
        .post(
          `${baseUrl}api/management/routine?routine_id=${selecetedRoutineInfo.routineId}`,
          selectedRoutineTraining
        )
        .then((res) => {
          console.log("루틴 운동 추가");
          setSelectedRoutineTraining([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 루틴 저장 버튼
  const onClickBtn = () => {
    if (selecetedRoutineInfo.title !== title) {
      putRoutineTitle();
    }
  };

  useEffect(() => {
    postRoutineTrainingList();
  }, []);

  useEffect(() => {
    getRoutineDetail();
  }, [selectedRoutineTraining]);

  return (
    <>
      <Link to={`/diary/training/myroutine`}>
        <div className="absolute right-0">
          <XMarkIcon className="w-6 h-6 my-4 mr-2" />
        </div>
      </Link>
      <PageTitle pageTitle="루틴 편집" />
      <div className="m-4">
        <Input value={title} onChange={onChangeTitle} />
      </div>

      {/* 해당루틴 운동 리스트 */}
      <div className="flex flex-col gap-2">
        {selectedRoutine.map((data, idx) => {
          console.log(data);
          return (
            <div key={data.routineTrainingListId} className="px-4 py-2 bg-white rounded-lg">
              test
            </div>
          );
        })}
      </div>

      {/* 운동 추가 / 불러오기 */}
      <div className="grid grid-cols-2 pt-2 mb-4 text-center divide-x-4">
        <Link to={`/diary/training/choice/routine`}>운동추가</Link>
        <Link to={`/diary/training/load/routine`}>불러오기</Link>
      </div>

      <div className="fixed w-full bottom-16">
        <div className="p-2 m-4 text-center text-white bg-teal-700 rounded-md">
          <Link to={`/diary/training/myroutine`}>
            <Button buttonName="루틴으로 저장하기" onClick={() => onClickBtn()} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoutineEditPage;
