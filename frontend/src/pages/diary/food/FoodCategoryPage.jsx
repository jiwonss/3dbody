import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { BsFillTrash3Fill } from "react-icons/bs";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { userState } from "../../../recoil/common/UserState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { userCategoryFoodState } from "../../../recoil/diary/UserCategoryFoodState";
import PageTitle from "../../../components/common/PageTitle";
import Description from "../../../components/diary/training/Description";
import FoodDetailBox from "../../../components/diary/food/FoodDetailBox";

const FoodCategoryPage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const [userCategoryFood, setUserCategoryFood] = useRecoilState(
    userCategoryFoodState
  );
  const navigate = useNavigate();
  const { category } = useParams();
  const [showKcal, setShowKcal] = useState(false);

  // 날짜별 칼탄단지 총합 --------------------------------------------------------------------
  const totalcalorie = userCategoryFood
    .reduce((acc, cur) => {
      return acc + (cur.food.calorie * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);

  const totalcarbohydrate = userCategoryFood
    .reduce((acc, cur) => {
      return acc + (cur.food.carbohydrate * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);

  const totalprotein = userCategoryFood
    .reduce((acc, cur) => {
      return acc + (cur.food.protein * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);

  const totallipid = userCategoryFood
    .reduce((acc, cur) => {
      return acc + (cur.food.lipid * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);
  // 날짜별 칼탄단지 총합 --------------------------------------------------------------------

  // 뒤로가기 버튼
  const onClickBackBtn = () => {
    navigate(
      `/diary/food/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`
    );
  };

  // 식단 카테고리별 데이터 가져오기
  const getUserFoodCategory = async () => {
    await axios
      .get(
        `${baseUrl}api/management/food/list/category/${user.info.userId}?year=${
          selectedDate[0]
        }&month=${selectedDate[1]}&day=${
          selectedDate[2]
        }&category=${category.substring(0, 2)}`
      )
      .then((res) => {
        console.log(res.data);
        setUserCategoryFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // // 삭제 버튼
  const onClickDelete = async (foodId) => {
    await axios
      .delete(`${baseUrl}api/management/food/delete/${foodId}`)
      .then((res) => {
        console.log(foodId + "번 음식 삭제 성공");
        getUserFoodCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 식단 카테고리별 데이터 가져오기
  useEffect(() => {
    getUserFoodCategory();
  }, []);

  return (
    <div className={`bg-[#C9DECF]/30 pb-2 ${userCategoryFood.length > 5 ? "" : "h-screen"}`}>
      <div className="sticky top-0 bg-white">
        <div className="absolute my-4">
          <ChevronLeftIcon
            className="w-6 h-6 text-blue-500"
            onClick={onClickBackBtn}
          />
        </div>
        <PageTitle pageTitle={category} />
        <div className="p-4">
          {/* 카테고리 - 음식 성분 총합 */}
          <div className="flex flex-col bg-[#C9DECF]/30 border rounded-xl">
            <div className="flex gap-2 mx-2 my-2 justify-evenly">
              <div className="flex flex-col items-center p-1 bg-white border-white basis-2/5 rounded-xl">
                <Description
                  Title={totalcalorie + " kcal"}
                  subTitle={"칼로리"}
                  size={"xl"}
                  subsize={"sm"}
                />
              </div>
              <div className="flex flex-col items-center p-1 bg-white border-white basis-2/5 rounded-xl">
                <Description
                  Title={totalcarbohydrate + " g"}
                  subTitle={"탄수화물"}
                  size={"xl"}
                  subsize={"sm"}
                />
              </div>
            </div>
            <div className="flex gap-2 mx-2 mb-2 justify-evenly">
              <div className="flex flex-col items-center p-1 bg-white border-white basis-2/5 rounded-xl">
                <Description
                  Title={totalprotein + " g"}
                  subTitle={"단백질"}
                  size={"xl"}
                  subsize={"sm"}
                />
              </div>
              <div className="flex flex-col items-center p-1 bg-white border-white basis-2/5 rounded-xl">
                <Description
                  Title={totallipid + " g"}
                  subTitle={"지방"}
                  size={"xl"}
                  subsize={"sm"}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-4 border border-gray-300"/>
      </div>
      <div className={`mx-4 ${userCategoryFood.length > 5 ? "mb-16" : "h-1/2"}`}>
        {/* 음식 등록 없는 경우 */}
        <div className={`flex justify-center p-4 mb-2 bg-white border border-white rounded-xl ${userCategoryFood.length ? "hidden" : ""}`}>
          <p className="italic">등록된 식단이 없습니다.</p>
        </div>
        {/* 카테고리 - 음식 리스트 */}
        {userCategoryFood.map((data) => {
          return (
            <div
              className="flex mb-2 bg-white border border-white rounded-xl"
              key={data.userFoodId}
            >
              {/* 음식 정보 */}
              <div className="flex flex-col justify-center pb-1 pl-4 basis-full">
                <p><span className="text-base hover:font-semibold" onClick={() => {setShowKcal(!showKcal);}}>{data.food.name}</span><span className={`${showKcal ? "" : "hidden"}`}> : {data.food.calorie.toFixed(1)}kcal</span></p>
                <p style={{ fontSize: "12px" }}>
                  탄 {(data.food.carbohydrate * (data.servingSize / data.food.servingSize) * data.foodCount).toFixed(1)}g 단{" "}
                  {(data.food.protein * (data.servingSize / data.food.servingSize) * data.foodCount).toFixed(1)}g 지{" "}
                  {(data.food.lipid * (data.servingSize / data.food.servingSize) * data.foodCount).toFixed(1)}g
                </p>
              </div>
              {/* 정보 변경 및 삭제 */}
              <div className="flex justify-end gap-3 ml-8 mr-4">
                <FoodDetailBox data={data} category={category} />
                <div
                  className="flex items-center"
                  onClick={() => onClickDelete(data.userFoodId)}
                >
                  <BsFillTrash3Fill className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
        {/* 음식 추가 버튼 */}
        <div className={`flex justify-center p-4 bg-white border border-white rounded-xl`}>
          <Link to={`/diary/food/${category}/add`}>
            <PlusCircleIcon className="w-6 h-6 text-gray-700" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCategoryPage;
