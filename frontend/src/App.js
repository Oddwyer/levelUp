//Import css
import './App.css';
import './ExpenseNav.css';
import './ExpenseDetails.css';
import './AddExpenseForm.css';

//Import components
import axios from 'axios';
import ExpenseNav from './ExpenseNav';
import { useEffect, useState } from 'react';
import Expense from './Expense';

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
      <div className="App-backdrop" />
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
