import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MyPage from "../pages/mypage/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path: "/mypage",
        Component: MyPage
      }
    ]
  },
]);

export default router
