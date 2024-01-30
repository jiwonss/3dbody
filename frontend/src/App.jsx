import './App.css'
import BottomNavbar from './components/common/BottomNavbar';
import LoginPage from './pages/auth/LoginPage';

function App() {
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
