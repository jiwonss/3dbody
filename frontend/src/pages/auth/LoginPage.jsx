import { useState } from "react";
import Button from "./../../components/common/Button";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = useRecoilValue(baseUrlState);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(`${baseUrl}api/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data)
        console.log("성공");
        localStorage.clear();
        localStorage.setItem("key", res.data.dataBody.accessToken);
        localStorage.setItem("isLogin", true);
        window.location.replace("/");
        localStorage
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <Button type={"submit"} buttonName={"로그인"} />
      </form>
    </div>
  );
};

export default LoginPage;
