//Import css
import './App.css';
import axios from "axios";
import BudgetPage from './pages/BudgetPage.jsx';
import './components/expense/ExpenseNav.css';
import './components/expense/ExpenseDetails.css';
import './components/expense/Expense.css';

//Import components
import axios from 'axios';
import ExpenseNav from './components/expense/ExpenseNav';
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
  <div className="App">
    <header className="site-header">
      <ExpenseNav />
    </header>
    <main className="app-main">
      <Expense />
      <BudgetPage />
    </main>
  </div>
);
}

export default App;
