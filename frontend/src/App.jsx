import { useRecoilValue } from 'recoil';
import './App.css'
import BottomNavbar from './components/common/BottomNavbar';
import LoginPage from './pages/auth/LoginPage';
import {  modalComponent } from './recoil/modal/ModalComponent';

function App() {
  const modal = useRecoilValue(modalComponent)
  return (
    <div>
      {localStorage.getItem("isLogin") === "true" ? (
        <BottomNavbar />
      ) : (
        <LoginPage />
      )}
      {modal}
    </div>
  );
}

export default App;
