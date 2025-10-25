import logo from './logo.svg';
import './App.css';
import './ExpenseNav.css';
import './Expense.css';
import axios from 'axios';
import Expense from './Expense';
import ExpenseNav from './ExpenseNav';
import { useEffect, useState } from 'react';
import RestClient from './RestClient';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8080/users');
    console.log(result);
  };
  return (
    <div className="App">
      <ExpenseNav />
      <Expense />
    </div>
  );
}

export default App;
