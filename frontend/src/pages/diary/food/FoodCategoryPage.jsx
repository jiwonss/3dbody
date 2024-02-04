import axios from "axios";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { userState } from "../../../recoil/common/UserState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import PageTitle from "../../../components/common/PageTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
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

  const onClickBtn = () => {
    navigate(
      `/diary/food/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`
    );
  };

  const getUserFoodCategory = async () => {
    // 식단 데이터 가져오기
    await axios
      .get(
        `${baseUrl}api/management/food/list/category/${user.info.userId}?year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}&category=${category.substring(0, 2)}`
      )
      .then((res) => {
        console.log(res.data);
        setFoodList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserFoodCategory();
  }, []);

  return (
    <>
      <div className="absolute my-4">
        <ChevronLeftIcon
          className="w-6 h-6 text-blue-500"
          onClick={onClickBtn}
        />
      </div>
      <PageTitle pageTitle={category} />
      <div className="m-4">
        {/* 카테고리 - 음식 성분 총합 */}
        <div className="flex flex-col mb-4 border-2">
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
        {/* 카테고리 - 음식 리스트 */}
        {foodList.map((data) => {
          return (
            <div className="flex mb-2 border-2" key={data.userFoodId}>
              <div className="flex flex-col py-1 pl-4 basis-3/5">
                <p>{data.food.name}</p>
                <p style={{ fontSize: "12px" }}>
                  탄 {data.food.carbohydrate.toFixed(1)}g {" "}
                  단 {data.food.protein.toFixed(1)}g {" "}
                  지 {data.food.lipid.toFixed(1)}g
                </p>
              </div>
              <div className="flex basis-2/5">
                <input
                  type="text"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  value={data.food.servingSize + " g"}
                  className="m-2 text-center border-2 basis-3/5"
                />
                <div className="flex items-center">그림</div>
              </div>
            </div>
          );
        })}
        {/* 음식 추가 버튼 */}
        <div className="flex justify-center p-2 border-2">
          <Link to={`/diary/food/${category}/add`}>
            <PlusCircleIcon className="w-6 h-6 text-gray-700" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default FoodCategoryPage;
