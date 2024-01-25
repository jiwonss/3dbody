const PageTitle = (props) => {
  return (
    // props로 받아와서 홈, 다이어리, 불러오기 등 단어만 바뀌게
    // CSS는 다시 해야함
    <div>
      {props.pageTitle}
    </div>
  )
};

export default PageTitle;
