// Import React Hook
import React, { useState } from 'react';

// Child - AddExpenseForm Component Function
export default function AddExpenseForm({ onAddExpense }) {

  // "Expense" Object Variables + Define Form / SetForm
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    expense_date: '',
  });

  // Other Error Catching / Boolean Variables
  // errors:     an object holding field-specific validation messages
  // submitting: true while we're waiting for backend response (disables button/spinner)
  // serverError: message shown when the backend fails (network, validation, etc.)
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Validate Proper Form Completion
  function validate(f) {
    const e = {};
    if (!f.amount || Number.isNaN(Number(f.amount)) || Number(f.amount) <= 0) e.amount = 'Enter a valid amount > 0';
    if (!f.category.trim()) e.category = 'Category is required';
    if (!f.expense_date) e.expense_date = 'Date is required';
    return e;
  }

  // Changes to Expense Form Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  // OnClick Save Expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear Old Errors
    setServerError('');
    //Invoke Validation
    const v = validate(form);
    setErrors(v);

    // If Invalid - Stop
    if (Object.keys(v).length) return;

    // If Valid - Continue
    setSubmitting(true);

    try {
      // Create New Expense Object
      const expenseData = {
        amount: Number(form.amount),
        category: form.category.trim(),
        description: form.description.trim(),
        expense_date: form.expense_date,
      };

      // Invoke When Receive Form from Expense.js
      await onAddExpense(expenseData);

      // Reset Form
      setForm({ amount: '', category: '', description: '', expense_date: '' });
    } catch (err) {
      setServerError(err.message || 'Failed to save expense.');
    } finally {
      // Reset Submission Boolean Value
      setSubmitting(false);
    }
  };

  // Expense Form Dispay + Save Expense Button
  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      {/* Show top-level server error (e.g., network failure) */}
      {serverError && <div className="error">{serverError}</div>}
      {/* Expense Form + Invoke Submission*/}
      <form className="expense-form" onSubmit={handleSubmit}>


        {/* Expense Amount Field */}
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}

          />
        </div>
        {/* Inline field-level validation message */}
        {errors.amount && <p className="error">{errors.amount}</p>}


        {/* Expense Category Field */}
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        {/* Inline field-level validation message */}
        {errors.category && <p className="error">{errors.category}</p>}


        {/* Expense Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Expense Date Field */}
        <div className="form-group">
          <label htmlFor="expense_date">Transaction Date:</label>
          <input
            type="date"
            id="expense_date"
            name="expense_date"
            value={form.expense_date}
            onChange={handleChange}
          />
        </div>
        {/* Inline field-level validation message */}
        {errors.expense_date && <p className="error">{errors.expense_date}</p>}

        <button type="submit"disabled={submitting}>Save Expense</button>
      </form>
    </div>
  );
}
