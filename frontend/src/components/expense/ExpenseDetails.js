// Child - ExpenseDetails Component Function
export default function ExpenseDetails({ expenses }) {
  return (

    <div className="expenses-display">
            <h2>Current Expenses</h2>
      {expenses.length > 0 ? (
        // Expense Cards Wrapper (Small Container for Each Expense)
        <div className="expense-list">
          {/* Map Through Each Expense and Render as a Card */}
          {expenses.map((expense) => (
            <div className="expense-card" key={expense.id}>
              {/* Category Title*/}
              <h3 className="expense-category">{expense.category}</h3>

              {/* Expense Details Display*/}
              <p> ${Number(expense.amount).toFixed(2)}</p>
              <p> {expense.description}</p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(expense.expense_date).toLocaleDateString()}
              </p>
              <p>
                <small>
                  Added on {new Date(expense.created_at).toLocaleString()}
                </small>
              </p>
            </div>
          ))}
        </div>
      ) : (
        // No Expenses Display.
        <p>No expenses to date.</p>
      )}
    </div>

  );
}
