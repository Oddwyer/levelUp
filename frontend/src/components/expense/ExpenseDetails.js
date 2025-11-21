import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Parent Class Props:
// - expenses: array of expense objects to display
// - onUpdate: function(expense) -> called when user clicks "Edit" on a card
// - onDelete: function(id)      -> called when user clicks "Delete" on a card

// Child - ExpenseDetails Component Function
export default function ExpenseDetails({ expenses, onUpdate, onDelete }) {
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
              expenseDate,
              created_at,
            } = expense;

            // Safely Format Transaction Date -> 'let' is flexible generic type
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
              // Card for Each Expense
              <Card
                className="expense-card"
                sx={{ maxWidth: 600 }}
                key={id ?? `${category}-${amount}-${expenseDate}`}
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
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: 1
                    }}>
                    <Typography
                      sx={{
                        color: 'brand-black',
                        fontWeight: 'bold'
                      }}>
                      Amount:&nbsp;
                    </Typography>
                    ${amount != null && amount !== ''
                      ? Number(amount).toFixed(2)
                      : '0.00'}
                  </Box>

                  {/* Description */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: 1
                    }}>
                    <Typography
                      sx={{
                        color: 'brand-black',
                        fontWeight: 'bold'
                      }}>
                      Description:&nbsp;
                    </Typography>
                    {description ? description : ''}
                  </Box>

                  {/* Transaction Date */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: 1
                    }}>
                    <Typography
                      sx={{
                        color: 'brand-black',
                        fontWeight: 'bold'
                      }}>
                      Transaction Date:&nbsp;
                    </Typography>
                    {formattedDate || 'No Date'}
                  </Box>
                </CardContent>

                {/* Action Buttons: Update + Delete */}
                <CardActions className="card-actions">
                  <button
                    type="button"
                    className="edit-expense-btn"
                    //onUpdate && confirms method exists before invoking (error-checking)
                    onClick={() => onUpdate && onUpdate(expense)}
                    aria-label={`Edit expense ${category || ''}`}
                  >
                    {/*Edit Icon + Text*/}
                    <span className="material-symbols-outlined">edit</span>
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-expense-btn"
                    //onDelete && confirms method exists before invoking (error-checking)
                    onClick={() => onDelete && onDelete(id)}
                    aria-label={`Delete expense ${category || ''}`}
                  >
                    {/*Delete Icon + Text*/}
                    <span className="material-symbols-outlined">delete</span>
                    Delete
                  </button>
                </CardActions>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
