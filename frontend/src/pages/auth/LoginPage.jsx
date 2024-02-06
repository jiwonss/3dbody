import { useState } from "react";
import Button from "./../../components/common/Button";
import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import { modalState } from "../../recoil/modal/ModalState";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = useRecoilValue(baseUrlState);
  const setUser = useSetRecoilState(userState);
  const setModalData = useSetRecoilState(modalState);

  const onSignUpHandler = () => {
    setModalData({ type: "signup", data: "" });
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(event);
    await axios
      .post(`${baseUrl}api/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        console.log("성공");
        localStorage.clear();
        localStorage.setItem("isLogin", true);
        setUser({
          token: res.data.data_body.token.access_token,
          info: res.data.data_body.user_info,
        });
        window.location.replace("/");
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
        <input type="button" onClick={onSignUpHandler} value={"회원가입"} />
      </form>
    </div>
  );
};

export default LoginPage;
 