// This component defines display list for expenses.
export default function ExpenseDetails({ expenses }) {
  return (

    <div className="expenses-display">
      {expenses.length > 0 ? (
        // Wrapper for all expense "cards" (small container for each expense)
        <div className="expense-list">
          {/* Map through each expense and render it as a card */}
          {expenses.map((expense) => (
            <div className="expense-card" key={expense.id}>
              {/* Category shown as a title */}
              <h3 className="expense-category">{expense.category}</h3>

              {/* Expense details */}
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
        // If there are no expenses.
        <p>No expenses to date.</p>
      )}
    </div>

  );
}
