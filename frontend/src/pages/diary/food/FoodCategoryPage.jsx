import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { BsFillTrash3Fill } from "react-icons/bs";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { userState } from "../../../recoil/common/UserState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import PageTitle from "../../../components/common/PageTitle";
import Description from "../../../components/diary/training/Description";

const FoodCategoryPage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const [foodList, setFoodList] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

  // 날짜별 칼탄단지 총합 --------------------------------------------------------------------
  const totalcalorie = foodList
    .reduce((acc, cur) => {
      return acc + cur.food.calorie;
    }, 0)
    .toFixed(1);

  const totalcarbohydrate = foodList
    .reduce((acc, cur) => {
      return acc + cur.food.carbohydrate;
    }, 0)
    .toFixed(1);

  const totalprotein = foodList
    .reduce((acc, cur) => {
      return acc + cur.food.protein;
    }, 0)
    .toFixed(1);

  const totallipid = foodList
    .reduce((acc, cur) => {
      return acc + cur.food.lipid;
    }, 0)
    .toFixed(1);
  // 날짜별 칼탄단지 총합 --------------------------------------------------------------------

  // 뒤로가기 버튼
  const onClickBackBtn = () => {
    navigate(`/diary/food/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`);
  };

  // 식단 카테고리별 데이터 가져오기
  const getUserFoodCategory = async () => {
    await axios
      .get(
        `${baseUrl}api/management/food/list/category/${user.info.userId}?year=${
          selectedDate[0]
        }&month=${selectedDate[1]}&day=${selectedDate[2]}&category=${category.substring(0, 2)}`
      )
      .then((res) => {
        console.log(res.data);
        setFoodList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 삭제 버튼
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

  const onClickBtn = (params) => {
    if (params === "left") {
      setSelectedBtn("left");
    } else {
      setSelectedBtn("right");
    }
    console.log(selectedBtn);
  };

  return (
    <>
      <div className="sticky top-0 bg-white">
        <div className="absolute my-4">
          <ChevronLeftIcon className="w-6 h-6 text-blue-500" onClick={onClickBackBtn} />
        </div>
        <PageTitle pageTitle={category} />
        <div className="p-4">
          {/* 카테고리 - 음식 성분 총합 */}
          <div className="flex flex-col border-2">
            <div className="flex gap-2 mx-2 my-2 justify-evenly">
              <div className="flex flex-col items-center p-1 border-2 basis-2/5">
                <Description
                  Title={totalcalorie + " kcal"}
                  subTitle={"칼로리"}
                  size={"xl"}
                  subsize={"sm"}
                />
              </div>
              <div className="flex flex-col items-center p-1 border-2 basis-2/5">
                <Description
                  Title={totalcarbohydrate + " g"}
                  subTitle={"탄수화물"}
                  size={"xl"}
                  subsize={"sm"}
                />
              </div>
            </div>
            <div className="flex gap-2 mx-2 mb-2 justify-evenly">
              <div className="flex flex-col items-center p-1 border-2 basis-2/5">
                <Description
                  Title={totalprotein + " g"}
                  subTitle={"단백질"}
                  size={"xl"}
                  subsize={"sm"}
                />
              </div>
              <div className="flex flex-col items-center p-1 border-2 basis-2/5">
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
      </div>
      <div className="mx-4">
        {/* 카테고리 - 음식 리스트 */}
        {foodList.map((data) => {
          return (
            <div
              className="flex items-center mb-2 border-2 border-gray-400 rounded-md"
              key={data.userFoodId}
            >
              {/* 음식 정보 */}
              <div className="flex flex-col pl-4 basis-10/12">
                <p>{data.food.name}</p>
                <p style={{ fontSize: "12px" }}>
                  탄 {data.food.carbohydrate.toFixed(1)}g 단 {data.food.protein.toFixed(1)}g 지{" "}
                  {data.food.lipid.toFixed(1)}g
                </p>
              </div>
              {/* 정보 변경 및 삭제 */}
              <div className="flex flex-col">
                <div className="flex gap-2 mt-2 mr-2">
                  <button
                    className="text-xs text-white bg-teal-700 rounded-full basis-1/2"
                    onClick={() => onClickBtn("left")}
                  >
                    g 단위
                  </button>
                  <button
                    className="text-xs text-white bg-teal-700 rounded-full basis-1/2"
                    onClick={() => onClickBtn("right")}
                  >
                    개수 단위
                  </button>
                </div>
                <div className="flex basis-2/5">
                  <input
                    type="text"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    value={data.food.servingSize + " g"}
                    className="m-2 text-center border-2 basis-1/2"
                  />
                  <div className="flex items-center" onClick={() => onClickDelete(data.userFoodId)}>
                    <BsFillTrash3Fill className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* 음식 추가 버튼 */}
        <div className="flex justify-center p-4 mb-16 border-2 border-gray-400 rounded-md">
          <Link to={`/diary/food/${category}/add`}>
            <PlusCircleIcon className="w-6 h-6 text-gray-700" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default FoodCategoryPage;
