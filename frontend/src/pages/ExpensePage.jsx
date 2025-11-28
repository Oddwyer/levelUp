//Import components
import ExpenseNav from '../components/expense/ExpenseNav';
import Expense from '../components/expense/Expense';

export default function ExpensePage() {
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