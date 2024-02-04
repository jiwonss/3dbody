import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Description from "../training/Description";
import NextButton from "../../common/NextButton";

const FoodByCategory = ({ category, data }) => {
  return (
    <Link to={`/diary/food/${category}`}>
      <div className="flex justify-between p-4 border rounded-xl">
        <div>
          <Description
            Title={category}
            subTitle={`${data
              .reduce((acc, cur) => {
                return acc + cur.food.calorie;
              }, 0)
              .toFixed(1)}kcal / ${data
              .reduce((acc, cur) => {
                return acc + cur.food.carbohydrate;
              }, 0)
              .toFixed(1)}g / ${data
              .reduce((acc, cur) => {
                return acc + cur.food.protein;
              }, 0)
              .toFixed(1)}g / ${data
              .reduce((acc, cur) => {
                return acc + cur.food.lipid;
              }, 0)
              .toFixed(1)}g`}
          />
        </div>
        <div className="flex items-center">
          <NextButton />
        </div>
      </div>
    </Link>
  );
};

FoodByCategory.propTypes = {
  category: PropTypes.string,
  data: PropTypes.array,
};

export default FoodByCategory;
