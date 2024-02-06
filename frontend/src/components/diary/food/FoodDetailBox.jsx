import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { userState } from "../../../recoil/common/UserState";
import { userCategoryFoodState } from "../../../recoil/diary/UserCategoryFoodState";

const FoodDetailBox = ({ data, category }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const setUserCategoryFood = useSetRecoilState(userCategoryFoodState);
  const [unit, setUnit] = useState("left");
  const [value, setValue] = useState("");

  const onClickLeftBtn = () => {
    setUnit("left");
  };

  const onClickRightBtn = () => {
    setUnit("right");
  };

  const onChangeUnit = (e) => {
    setValue(e.target.value);
  };

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
        console.log("FoodList Reloading");
        setUserCategoryFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // g단위 변경 요청
  const patchServingSize = async (e) => {
    e.preventDefault();
    await axios
      .put(`${baseUrl}api/management/food/update/${data.userFoodId}`, {
        servingSize: parseInt(value, 10), // 정수변환 (100g -> 100)
      })
      .then((res) => {
        console.log(data.food.name + "데이터 수정");
        getUserFoodCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 개수 단위 변경 요청
  const patchCount = async (e) => {
    e.preventDefault();
    await axios
      .put(`${baseUrl}api/management/food/update/${data.userFoodId}`, {
        foodCount: value.replace(/개/g, ""), // 문자대체 (2개 -> 2)
      })
      .then((res) => {
        console.log(data.food.name + "데이터 수정");
        getUserFoodCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setValue(
      unit === "left" ? data.servingSize + " g" : data.foodCount + " 개"
    );
  }, [unit]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-2 mt-1">
        <button
          className={`text-xs ${
            unit === "left" ? "text-teal-700 font-semibold" : ""
          }`}
          onClick={() => onClickLeftBtn()}
        >
          그램
        </button>
        <button
          className={`text-xs ${
            unit === "right" ? "text-teal-700 font-semibold" : ""
          }`}
          onClick={() => onClickRightBtn()}
        >
          개수
        </button>
      </div>
      <form onSubmit={unit === "left" ? patchServingSize : patchCount}>
        <input
          type="text"
          value={value}
          onChange={onChangeUnit}
          className="p-1 my-1 text-center border-2"
        />
      </form>
    </div>
  );
};

FoodDetailBox.propTypes = {
  data: PropTypes.object,
  category: PropTypes.string,
};

export default FoodDetailBox;
