//Import css
import './App.css';
import axios from "axios";
import BudgetPage from './pages/BudgetPage.jsx';
import './components/expense/ExpenseNav.css';
import './components/expense/ExpenseDetails.css';
import './components/expense/Expense.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpensePage from "./pages/ExpensePage";
import ExpenseNav from "./components/expense/ExpenseNav";
import { useEffect, useState } from 'react';
import Expense from './components/expense/Expense';

// Import authentication components
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';

function App() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing token on initial load - FOR TESTING, COMMENT THIS OUT
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    // if (token) {
    //     setIsLoggedIn(true);
    // }

    // FOR TESTING: Always start at login
    setIsLoggedIn(false);
    setView('login');

    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/users");
      setUsers(result.data || []);
      console.log("loaded users", result.data);
    } catch (err) {
      console.error("failed loading users", err);
    }
  };

  const navigateToForgotPassword = () => setView('forgotPassword');
  const navigateToSignUp = () => setView('signup');
  const navigateToLogin = () => setView('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("Login successful - would navigate to main app");
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    navigateToLogin();
  }

  // FOR TESTING: Temporary function to simulate login success
  const tempLogin = () => {
    console.log("Temporary login - would normally check credentials");
    handleLogin();
  }

  // AUTH SCREENS - shown when NOT logged in
  if (!isLoggedIn) {
    return (
      <div className="App">
        {view === 'login' && (
          <Login
            onForgotPasswordClick={navigateToForgotPassword}
            onSignUpClick={navigateToSignUp}
            onLoginSuccess={tempLogin}  // Use temp function for testing
          />
        )}
        {view === 'forgotPassword' && (
          <ForgotPassword onBackToLogin={navigateToLogin} />
        )}
        {view === 'signup' && (
          <SignUp onBackToLogin={navigateToLogin} />
        )}
      </div>
    );
  }

  // MAIN APP - shown when user IS logged in
  return (
    <Router>
      <ExpenseNav onLogout={handleLogout} />
      <Routes>
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        {/* fallback */}
        <Route path="*" element={<ExpensePage />} />
      </Routes>
    </Router>
  );
}

export default App;
