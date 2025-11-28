//Import css
import './App.css';
import axios from "axios";
import BudgetPage from './pages/BudgetPage.jsx';
import './components/expense/ExpenseNav.css';
import './components/expense/ExpenseDetails.css';
import './components/expense/Expense.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpensePage from "./pages/ExpensePage";
// import Dashboard from "./pages/Dashboard";
import ExpenseNav from "./components/expense/ExpenseNav";
//Import components
import { useEffect, useState } from 'react';
import Expense from './components/expense/Expense';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

return (
  <Router>
      <ExpenseNav />
      <Routes>
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/budget" element={<BudgetPage />} />
      {/*  <Route path="/dashboard" element={<Dashboard />} />

        {/* fallback */}

        <Route path="*" element={<ExpensePage />} />
      </Routes>
    </Router>
);
}

export default App;
