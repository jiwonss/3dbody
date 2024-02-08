import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { modelTokenState } from "../../recoil/common/ModelTokenState";
import { userState } from "../../recoil/common/UserState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const ThreeD = () => {
  const [token, setToken] = useRecoilState(modelTokenState);
  const [user, setUser] = useRecoilState(userState);
  const baseUrl = useRecoilValue(baseUrlState);
  let asset_id = "";
  
  const download = () =>{
    axios({
      method: "post",
      url: "/avatars/373334c8-66e3-4f72-90f6-24f86b1224d2/export",
      headers:{
        Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuSnVpYzVwbXk1T1hGSjVmY1RIQTdUNVktRHZVbVVOR2xxVHBqS0hDVnU4In0.eyJleHAiOjE3MDczODkxOTgsImlhdCI6MTcwNzM1MzE5OCwianRpIjoiZGFjZjI1NzAtNWZkZC00MzU3LTg0NWQtOGMwYTY0ZGFjYjEwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1lc2hjYXBhZGUuY29tL3JlYWxtcy9tZXNoY2FwYWRlLW1lIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijc1NDFiNTczLWVkODAtNGI4Mi1iZTlkLTFlY2VkYjZlZjFmMiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1lc2hjYXBhZGUtbWUiLCJzZXNzaW9uX3N0YXRlIjoiMTg4MjJkNzItNGRjMy00NGJhLTk1ZGYtNDkxZjE5MTcwYTcxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL21lc2hjYXBhZGUuY29tIiwiaHR0cHM6Ly9tZS5tZXNoY2FwYWRlLmNvbSIsImh0dHBzOi8vbWVzaGNhcGFkZS5tZSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWdjbWMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxODgyMmQ3Mi00ZGMzLTQ0YmEtOTVkZi00OTFmMTkxNzBhNzEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJzZW9uZ2d3b24ga2FuZyIsInByZWZlcnJlZF91c2VybmFtZSI6InJrZHRqZHJuanMxMUBuYXZlci5jb20iLCJnaXZlbl9uYW1lIjoic2Vvbmdnd29uIiwiZmFtaWx5X25hbWUiOiJrYW5nIiwiZW1haWwiOiJya2R0amRybmpzMTFAbmF2ZXIuY29tIn0.SkR8KDuwAJcy8Da6LEHJsHNTeocdgJRvualcoZsYfl15A8Lp7JWOyO2OLC-BfXgEUhCOgOlnz9o8nciqPJMbVvKHsa-7z6qYYXPJxis_bfc6izUi3t7BNJ7LWvzA4tWsB90m51HzlyWFVtgKdy-ZuC4T96utjiJ3iKwPKDALyMW7E6HtyIniO29anriSg0badbyYTVTZaj_Evme_9gUZ2kndd_-SYLOqYqYTqwli9l_RfAr1oMnR-hPCyzHT9kdZoJozqWxo3qxj3RKUquvq-IB4viroqMj-9DV5Gym6ht338bHvNHQF3ZLwyUYMZbSjuWPgjd--6MSQs64OXGRq6w"
      },
      data:{
        pose: "a",
        format: "obj"
      }
    }).then((res)=>{
      console.log(res)
    })
  }

  const get3dToken = () => {
    axios({
      method: "post",
      url: "/realms/meshcapade-me/protocol/openid-connect/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        grant_type: "password",
        client_id: "meshcapade-me",
        username: "rkdtjdrnjs11@naver.com",
        password: "rkdtjdrnjs11",
      },
    }).then((res) => {
      console.log(res);
      setToken(res.data.access_token);
    });
  };
  const createModel = () => {
    axios({
      method: "post",
      url: "avatars/create/from-measurements",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: "test1",
        gender: "male",
        measurements: {
          Height: 172,
          Weight: 70,
        },
      },
    }).then((res) => {
      console.log(res.data);
      asset_id = res.data.id;
      axios({
        method: "post",
        url: `avatars/${asset_id}/export`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { format: "obj", pose: "a" },
      }).then((res) => {
        console.log(res);
        axios({
          method: "post",
          url: `${baseUrl}api/3d/${user.info.userId}/current`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            asset_id: asset_id,
            avatar_url: res.data.url.path,
          },
        }).then(() => {});
      });
    });
  };
  return (
    <div>
      <button className="m-8 border-4 bg-slate-400" onClick={() => get3dToken()}>토큰 받기</button>
      <button className="m-8 border-4 bg-slate-400" onClick={() => createModel()}>모델 생성</button>
      <button className="m-8 border-4 bg-slate-400" onClick={()=> download()}>다운로드</button>
    </div>
  );
};

export default ThreeD;
