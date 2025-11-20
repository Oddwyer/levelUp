import logo from './logo.svg';
import './App.css';
import axios from "axios";
import BudgetPage from './pages/BudgetPage.js';

import { useEffect, useState } from 'react';


function App() {
  
  const [users, setUsers] = useState([])

  useEffect(()=> {
    loadUsers();
  },[])

  const loadUsers = async()=> {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data || []);
      console.log('loaded users', result.data);
    } catch (err) {
      console.error('failed loading users', err);
    }
  }
  return (
    <BudgetPage/>
  );
}

export default App;
