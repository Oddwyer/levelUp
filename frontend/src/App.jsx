import { useEffect, useState } from 'react';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import Dashboard from './components/PlaceholderDashboard';
import './App.css'; 

function App() {
  const [view, setView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        setIsLoggedIn(true);
    }
  }, []);

  const navigateToForgotPassword = () => setView('forgotPassword');
  const navigateToSignUp = () => setView('signup');
  const navigateToLogin = () => setView('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    navigateToLogin();
  }

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {view === 'login' && <Login onForgotPasswordClick={navigateToForgotPassword} onSignUpClick={navigateToSignUp} onLoginSuccess={handleLogin} />}
      {view === 'forgotPassword' && <ForgotPassword onBackToLogin={navigateToLogin} />}
      {view === 'signup' && <SignUp onBackToLogin={navigateToLogin} />}
    </div>
  );
}

export default App;
