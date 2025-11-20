// Child - ExpenseDetails Component Function


// Parent Class Props:
// - expenses: array of expense objects to display
// - onEdit:   function(expense) -> called when user clicks "Edit" on a card
// - onDelete: function(id)      -> called when user clicks "Delete" on a card

export default function ExpenseDetails({ expenses, onEdit, onDelete }) {
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
            expense_date,
            created_at,
          } = expense;

          // Safely Format Transaction Date
          let formattedDate = '';
          if (expense_date) {
            const d = new Date(expense_date);
            formattedDate = isNaN(d.getTime())
              ? String(expense_date) // If Invalid Date, Show Raw Value
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
              key={id ?? `${category}-${amount}-${expense_date}`}>
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
                <strong>Date: </strong>
                {formattedDate || "No Date"}
              </p>

              {/* Created-at Info */}
              {createdAtText && (
                <p>
                  <small>Added on: {createdAtText}</small>
                </p>
              )}

              {/* Action Buttons: Update + Delete */}
              <div className="card-actions">
                <button
                  type="button"
                  className="edit-expense-btn"
                  // Call to Edit Handler w/ Whole Expense Object
                  onClick={() => onEdit && onEdit(expense)}
                  aria-label={`Edit expense ${category || ''}`}
                >
                  <span className="material-symbols-outlined">edit</span>
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-expense-btn"
                  // Call to Delete handler via ID
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
