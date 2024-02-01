import { useRecoilValue } from 'recoil';
import './App.css'
import BottomNavbar from './components/common/BottomNavbar';
import LoginPage from './pages/auth/LoginPage';
import { modalState } from './recoil/modal/modalState';

function App() {
  const modalData = useRecoilValue(modalState)
  return (
    <div>
      {localStorage.getItem("isLogin") === "true" ? (
        <BottomNavbar />
      ) : (
        <LoginPage />
      )}
      {modalData.isopen ? modalData.component : false}
    </div>
  );
}

export default App;
