import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './App.css'
import BottomNavbar from './components/common/BottomNavbar';
import LoginPage from './pages/auth/LoginPage';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <div>
      {localStorage.getItem("isLogin") === "true" ? (
        <BottomNavbar />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
