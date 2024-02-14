import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Suspense>
      <RouterProvider router={router} fallbackElement={"로딩중!!!!!"} />
    </Suspense>
  </RecoilRoot>
);
