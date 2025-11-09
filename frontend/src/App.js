//Import css
import './App.css';
import './components/expense/ExpenseNav.css';
import './components/expense/ExpenseDetails.css';
import './components/expense/AddExpenseForm.css';

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
    const result = await axios.get('http://localhost:8080/api/users');
    console.log(result);
  };
  return (
    <div className="App">
      <header className="site-header">
        <ExpenseNav />
      </header>
      <main className="app-main">
        <Expense />
      </main>
    </div>
  );
}

export default App;
