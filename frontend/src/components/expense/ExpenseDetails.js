import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Parent Class Props:
// - expenses: array of expense objects to display
// - onEdit:   function(expense) -> called when user clicks "Edit" on a card
// - onDelete: function(id)      -> called when user clicks "Delete" on a card

// Child - ExpenseDetails Component Function
export default function ExpenseDetails({ expenses, onEdit, onDelete }) {
  return (
    <div className="expenses-display">
      {/* Section Title */}
      <Typography sx={{ color: '#8f1321', fontWeight: 'bold', fontSize: '25px', marginTop: 1, marginBottom: 1 }}>
        Current Expenses
      </Typography>

      {/* If No Expenses, Display 'No Expenses To Date' */}
      {(!expenses || expenses.length === 0) && (
        <div className="empty">No Expenses to Date.</div>
      )}

      {/* Else, If Expenses, Display the list of cards */}
      {expenses && expenses.length > 0 && (
        <div className="expense-list">
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
              // Card for Each Expense
              <Card
                className="expense-card"
                sx={{ maxWidth: 600 }}
                key={id ?? `${category}-${amount}-${expense_date}`}
              >
                <CardContent>
                  {/* Category Title*/}
                  <Typography
                    className="expense-category"
                    sx={{
                      color: 'brand-black',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    }}
                  >
                    {category || 'Uncategorized'}
                  </Typography>

                  {/* Amount */}
                  <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 1 }}>
                    <Typography sx={{ color: 'brand-black', fontWeight: 'bold' }}>
                      Amount:&nbsp;
                    </Typography>
                    ${amount != null && amount !== ''
                      ? Number(amount).toFixed(2)
                      : '0.00'}
                  </Box>

                  {/* Description */}
                  <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 1 }}>
                    <Typography sx={{ color: 'brand-black', fontWeight: 'bold' }}>
                      Description:&nbsp;
                    </Typography>
                    {description ? description : ''}
                  </Box>

                  {/* Transaction Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 1 }}>
                    <Typography sx={{ color: 'brand-black', fontWeight: 'bold' }}>
                      Date:&nbsp;
                    </Typography>
                    {formattedDate || 'No Date'}
                  </Box>

                  {/* Created-at Info */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: 1,
                      paddingBottom: 1,
                    }}
                  >
                    <Typography sx={{ color: 'brand-black', fontSize: '12px' }}>
                      Added on:&nbsp;
                    </Typography>
                    <Typography sx={{ color: 'brand-black', fontSize: '12px' }}>
                      {createdAtText}
                    </Typography>
                  </Box>
                </CardContent>

                {/* Action Buttons: Update + Delete */}
                <CardActions>
                  <div className="card-actions">
                    <button
                      type="button"
                      className="edit-expense-btn"
                      onClick={() => onEdit && onEdit(expense)}
                      aria-label={`Edit expense ${category || ''}`}
                    >
                      <span className="material-symbols-outlined">edit</span>
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-expense-btn"
                      onClick={() => onDelete && onDelete(id)}
                      aria-label={`Delete expense ${category || ''}`}
                    >
                      <span className="material-symbols-outlined">delete</span>
                      Delete
                    </button>
                  </div>
                </CardActions>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
