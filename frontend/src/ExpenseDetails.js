// This component defines display list for expenses.
export default function ExpenseDetails({ expenses }) {
  return (
    <div className="expenses-display">
      {/* Section heading */}

      {expenses.length > 0 ? (
        // Wrapper for all expense "cards" (small container for each expense)
        <div className="expense-grid">
          {/* Map through each expense and render it as a card */}
          {expenses.map((expense) => (
            <div className="expense-card" key={expense.id}>
              {/* Header row: category + amount side by side */}
              <div className="expense-header">
                {/* Category shown as a title */}
                <h3 className="expense-category">{expense.category}</h3>

                {/* Amount shown with currency formatting */}
                <p className="expense-amount">
                  ${Number(expense.amount).toFixed(2)}
                </p>
              </div>

              <p className="expense-description">{expense.description}</p>

              <div className="expense-date">
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(expense.expense_date).toLocaleDateString()}
                </p>

                {/* Timestamp */}
                <p>
                  <small>
                    Added on {new Date(expense.created_at).toLocaleString()}
                  </small>
                </p>
              </div>
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
