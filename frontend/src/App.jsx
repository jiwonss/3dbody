import "./App.css";
import { useState } from "react";
import InputComponent from "./common/Input";

function App() {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    console.log("검색어:", value);
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onHandleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div>{value}</div>
      <InputComponent type="text" value={value} onChange={onChangeInput} onKeyDown={onHandleKeyDown} />
    </>
  );
}

export default App;
