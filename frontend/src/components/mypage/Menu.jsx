import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

const Menu = ({ menus }) => {
  return (
    <div>
      {menus.map((menu) => {
        return (
          <div className="flex m-2" key={menu.menutitle}>
            {menu.menuicon}
            <p>{menu.menutitle}</p>
            <Link to={menu.menuurl}>
              <ChevronRightIcon className="w-6 h-6" />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

Menu.propTypes = {
  id:PropTypes.string,
  menus: PropTypes.array,
};

export default Menu;
