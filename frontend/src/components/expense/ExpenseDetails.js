import {Box, Card, CardActions, CardContent, Button, Typography} from '@mui/material';

// Parent Class Props:
// - expenses: array of expense objects to display
// - onUpdate: function(expense) -> called when user clicks "Edit" on a card
// - onDelete: function(id)      -> called when user clicks "Delete" on a card

// Child - ExpenseDetails Component Function
export default function ExpenseDetails({ expenses, onUpdate, onDelete }) {
  return (
    <Box className="expenses-display">
      {/* Expense List Header */}
      <Typography className='list-header'>
        Current Expenses
      </Typography>

      {/* If No Expenses, Display 'No Expenses To Date' */}
      {(!expenses || expenses.length === 0) && (
        <div className="empty">No Expenses to Date.</div>
      )}

      {/* Else, If Expenses, Display the list of cards */}
      {expenses && expenses.length > 0 && (
        <Box className="expense-list">
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
              <Card className="expense-card" sx={{ maxWidth: 600 }}
                key={id ?? `${category}-${amount}-${expenseDate}`}
              >
                <CardContent>
                  {/* Category Title*/}
                  <Typography className="expense-category">
                    {category || 'Uncategorized'}
                  </Typography>

                  {/* Amount */}
                  <Box className='line-item-box'>

                    <Typography className='line-item-text'>
                      Amount:&nbsp;
                    </Typography>
                    ${amount != null && amount !== ''? Number(amount).toFixed(2): '0.00'}
                  </Box>

                  {/* Description */}
                  <Box className='line-item-box'>
                    <Typography className='line-item-text'>
                      Description:&nbsp;
                    </Typography>
                    {description ? description : ''}
                  </Box>

                  {/* Transaction Date */}
                  <Box className='line-item-box'>
                    <Typography className='line-item-text'>
                      Transaction Date:&nbsp;
                    </Typography>
                    {formattedDate || 'No Date'}
                  </Box>
                </CardContent>

                {/* Action Buttons: Update + Delete */}
                <CardActions className="card-actions">
                  <Button className="update-expense-btn"
                    type="button"
                    //onUpdate && confirms method exists before invoking (error-checking)
                    onClick={() => onUpdate && onUpdate(expense)}
                    aria-label={`Update expense ${category || ''}`}
                  >
                    {/*Edit Icon + Text*/}
                    <span className="material-symbols-outlined">edit</span>
                    Edit
                  </Button>

                  <Button className="delete-expense-btn"
                    type="button"
                    //onDelete && confirms method exists before invoking (error-checking)
                    onClick={() => onDelete && onDelete(id)}
                    aria-label={`Delete expense ${category || ''}`}
                  >
                    {/*Delete Icon + Text*/}
                    <span className="material-symbols-outlined">delete</span>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
