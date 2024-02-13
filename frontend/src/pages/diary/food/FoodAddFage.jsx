import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import axios from "axios";

import BackButton from "./../../../components/common/BackButton";
import PageTitle from "../../../components/common/PageTitle";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import Search from "../../../components/common/Search";
import Button from "../../../components/common/Button";
import { userState } from "../../../recoil/common/UserState";
import { modalState } from "../../../recoil/modal/ModalState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";

const FoodAddFage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const { category } = useParams();
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const [searchFood, setSearchFood] = useState(null);
  const [searchFoodList, setSearchFoodList] = useState([]);
  const [selectedFoodList, setSelectedFoodList] = useState([]);
  const [modalData, setModalData] = useRecoilState(modalState);
  const [showKcal, setShowKcal] = useState(false);

  // 백 요청에 보낼 시간 계산
  const selectedTime = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]); // 선택한 시간
  const KoreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 GMT 시간보다 9시간 앞서 있다.
  const KoreaNow = new Date(selectedTime.getTime() + KoreaTimeDiff); // 백에서 -9시간 되므로 +9시간 값을 보내준다

  const onChangeSearchFood = (e) => {
    setSearchFood(e.target.value);
  };

  const getSearchFood = async (e) => {
    e.preventDefault();
    // 음식 검색 데이터 가져오기
    await axios
      .get(`${baseUrl}api/management/food/search?keyword=${searchFood}`)
      .then((res) => {
        console.log(res.data);
        setSearchFoodList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckboxChange = (foodId) => {
    // 체크박스가 체크되면 해당 음식을 selectedFoodList에 추가
    // 체크박스가 해제되면 해당 음식을 selectedFoodList에서 제거
    if (selectedFoodList.includes(foodId)) {
      setSelectedFoodList(selectedFoodList.filter((id) => id !== foodId));
    } else {
      setSelectedFoodList([...selectedFoodList, foodId]);
    }
  };

  const postFood = async (selectedFoodList) => {
    for (const foodId of selectedFoodList) {
      try {
        const res = await axios.post(`${baseUrl}api/management/food/list/add`, {
          user_id: user.info.userId,
          food_id: foodId,
          category: category.substring(0, 2),
          date: KoreaNow,
        });

        console.log("Request successful:", res.data);
      } catch (err) {
        console.error("Error during request:", err);
      }
    }
  };

  const onClickModal = () => {
    setModalData({
      type: "selfInputFood",
      data: category.substring(0, 2),
    });
  };

  return (
    <>
      <div className="sticky top-0 bg-white">
        <div className="absolute">
          <BackButton />
        </div>
        <PageTitle pageTitle="음식 추가하기" />
      </div>
      {/* 검색 창 */}
      <Search
        onSubmit={getSearchFood}
        onChange={onChangeSearchFood}
        placeholder={`찾으시는 음식을 검색해보세요.`}
        onBlur={getSearchFood}
      />
      {/* 검색 결과 목록 */}
      <div className="m-4 mb-48">
        {searchFoodList.map((data) => {
          return (
            <div className="flex mb-2 border rounded-md" key={data.foodId}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(data.foodId)}
                className="w-6 ml-4 accent-teal-600"
              />
              <div className="flex flex-col py-1 pl-4 basis-3/5">
                <p>
                  <span
                    className="text-base"
                    onClick={() => {
                      setShowKcal(!showKcal);
                    }}
                  >
                    {data.name}
                  </span>
                  <span className={`${showKcal ? "" : "hidden"}`}>
                    {" "}
                    : {data.calorie.toFixed(1)}kcal
                  </span>
                </p>
                <p style={{ fontSize: "12px" }}>
                  탄 {data.carbohydrate.toFixed(1)}g 단 {data.protein.toFixed(1)}g 지{" "}
                  {data.lipid.toFixed(1)}g
                </p>
              </div>
              <div className="flex basis-2/5">
                <input
                  type="text"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  value={data.servingSize + " g"}
                  className="m-2 text-center border-2 rounded-md basis-3/5"
                  disabled
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* 버튼 */}
      <div className="fixed w-full bg-white bottom-16">
        <div className="m-4">
          <div className="flex gap-4">
            <Button
              btnCss={"basis-1/2 text-center border border-teal-700 rounded-md p-2"}
              buttonName={"직접 입력하기"}
              onClick={onClickModal}
            />
            <Button
              btnCss={"basis-1/2 text-center text-white bg-teal-700 rounded-md p-2 "}
              buttonName={"추가하기"}
              onClick={() => postFood(selectedFoodList)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodAddFage;
