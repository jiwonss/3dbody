import PropTypes from "prop-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Search = ({ onSubmit, onChange, placeholder }) => {
  return (
    <div className="m-4">
        <div className="flex gap-2 border-2 rounded-md p-2">
          <div className="flex items-center">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              placeholder={placeholder}
              className="outline-none"
            />
          </form>
        </div>
      </div>
  );
};

Search.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Search;
