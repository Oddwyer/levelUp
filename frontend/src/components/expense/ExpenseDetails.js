// Parent Class Props:
// - expenses: array of expense objects to display
// - onUpdate:   function(expense) -> called when user clicks "Edit" on a card
// - onDelete: function(id)      -> called when user clicks "Delete" on a card

// Child - ExpenseDetails Component Function
export default function ExpenseDetails({ expenses, onUpdate, onDelete }) {
  return (
    <div className="expenses-display">
      <h2>Current Expenses</h2>

      {/* If No Expenses, Display 'No Expenses To Date'*/}
      {(!expenses || expenses.length === 0) && (
        <div className="empty">No Expenses to Date.</div>
      )}

      {/* Else, If Expenses, Display Expenses */}
      {(expenses && expenses.length > 0) && ( 

      <div className="expense-list">
        {/* Expense Cards Wrapper (Small Container for Each Expense*/}
        {/* Loop Through Each Expense and Render as a Card */}
        {expenses.map((expense) => {
          // Destructure Expense Object (Defensive Programming)
          const {
            id,
            amount,
            category,
            description,
            expenseDate,
            created_at,
          } = expense;

          // Safely Format Transaction Date
          let formattedDate = '';
          if (expenseDate) {
            const d = new Date(expenseDate);
            formattedDate = isNaN(d.getTime())
              ? String(expenseDate) // If Invalid Date, Show Raw Value
              : d.toLocaleDateString();
          }

          // Safely Format Created_at Timestamp
          let createdAtText = '';
          if (created_at) {
            const c = new Date(created_at);
            createdAtText = isNaN(c.getTime())
              ? String(created_at)
              : c.toLocaleString();
          }


          return (
            <div className="expense-card"
              key={id ?? `${category}-${amount}-${expenseDate}`}>
              {/* Category Title*/}
              <h3 className="expense-category">
                {category || "Uncategorized"}
              </h3>

              {/* Amount */}
              <p>
                <strong>Amount: </strong>
                ${amount != null && amount !== '' ?
                  Number(amount).toFixed(2) : '0.00'}
              </p>

              {/* Description -> Note: "description &&" means: if description, display it */}
              {description &&
                <p>
                  <strong>Description: </strong>
                  {description}
                </p>
              }

              {/* Transaction Date */}
              <p>
                <strong>Transaction Date: </strong>
                {formattedDate || "No Date"}
              </p>

              {/* Action Buttons: Update + Delete */}
              <div className="card-actions">
                <button
                  type="button"
                  className="update-expense-btn"
                  // onUpdate && confirms onUpdate() exists before invoking (error checking)
                  onClick={() => onUpdate && onUpdate(expense)}
                  aria-label={`Update expense ${category || ''}`}
                >
                  <span className="material-symbols-outlined">edit</span>
                  Update
                </button>

                <button
                  type="button"
                  className="delete-expense-btn"
                  // onDelete && confirms onUpdate() exists before invoking (error checking)
                  onClick={() => onDelete && onDelete(id)}
                  aria-label={`Delete expense ${category || ''}`}
                >
                  <span className="material-symbols-outlined">delete</span>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
   )}   
   </div>
 
  );
}
