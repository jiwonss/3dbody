import "./App.css";

import BottomNavbar from "./components/common/BottomNavbar";
import LoginPage from "./pages/auth/LoginPage";
import ModalManager from "./recoil/modal/ModalManager";

function App() {
  return (
    <div>
      {localStorage.getItem("isLogin") === "true" ? (
        <BottomNavbar />
      ) : (
        <LoginPage />
      )}
      {ModalManager()}
    </div>
  );
}

export default App;
