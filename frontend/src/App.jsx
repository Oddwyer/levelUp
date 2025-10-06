import { useEffect, useState } from 'react';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import LevelUpLogo from './components/LevelUpLogo';


function App() {
  const [view, setView] = useState('login'); 

  const navigateToForgotPassword = () => setView('forgotPassword');
  const navigateToSignUp = () => setView('signup');
  const navigateToLogin = () => setView('login');

  return (
    <div className="App">
      <script src="https://cdn.tailwindcss.com"></script>
      {view === 'login' && <Login onForgotPasswordClick={navigateToForgotPassword} onSignUpClick={navigateToSignUp} />}
      {view === 'forgotPassword' && <ForgotPassword onBackToLogin={navigateToLogin} />}
      {view === 'signup' && <SignUp onBackToLogin={navigateToLogin} />}
    </div>
  );
}

export default App;
