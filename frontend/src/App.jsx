import { useEffect, useState } from 'react';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import Dashboard from './components/PlaceholderDashboard';


function App() {
  const [view, setView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateToForgotPassword = () => setView('forgotPassword');
  const navigateToSignUp = () => setView('signup');
  const navigateToLogin = () => setView('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateToLogin();
  }

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      <script src="https://cdn.tailwindcss.com"></script>
      {view === 'login' && <Login onForgotPasswordClick={navigateToForgotPassword} onSignUpClick={navigateToSignUp} onLoginSuccess={handleLogin} />}
      {view === 'forgotPassword' && <ForgotPassword onBackToLogin={navigateToLogin} />}
      {view === 'signup' && <SignUp onBackToLogin={navigateToLogin} />}
    </div>
  );
}

export default App;
