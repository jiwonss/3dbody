import PropTypes from "prop-types";

const PageTitle = ({ pageTitle }) => {
  return (
    // props로 받아와서 홈, 다이어리, 불러오기 등 단어만 바뀌게
    // CSS는 다시 해야함
    <div>
      <div className='flex justify-center p-4'>
        {pageTitle}
      </div>
      <hr />
    </div>
  );
};

PageTitle.propTypes = {
  pageTitle: PropTypes.string,
};

export default PageTitle;
