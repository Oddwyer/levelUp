// Import React Hooks & Material UI Components
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Child - ExpenseForm Component Function
// Parent Class Props:
// - initialData: Expense Object to Update (Null for Add)
// - onSubmit:    function(expenseData) -> Parent handles Add or Update
// - onCancelEdit: function() -> Exit edit mode, return to "Add" mode

export default function ExpenseForm({ initialData, onSubmit, onCancelEdit }) {
  // "Expense" Object Variables + Define Form / SetForm
  const [form, setForm] = useState({
    id: undefined,
    amount: '',
    category: '',
    description: '',
    expenseDate: '',
  });

  // Error Catching / Boolean Variables
  // Errors: An object holding field-specific validation messages
  const [errors, setErrors] = useState({});

  // Submitting: True while we're waiting for backend response (disables button/spinner)
  const [submitting, setSubmitting] = useState(false);

  // ServerError: Message shown when the backend fails (network, validation, etc.)
  const [serverError, setServerError] = useState('');

  // Update / Add Boolean: Are we editing existing expense or adding new?
  const isEditMode = Boolean(form.id);


  useEffect(() => {
    // If initialData Exists -> Update Expense
    if (initialData) {
      setForm({
        id: initialData.id,
        amount: initialData.amount != null ? String(initialData.amount) : '',
        category: initialData.category || '',
        description: initialData.description || '',
        expenseDate: initialData.expenseDate ? String(initialData.expenseDate).slice(0, 10) : '',
      });
      setErrors({});
      setServerError('');
    }
    // If No initialData -> Add Expense
    else {
      setForm({
        id: undefined,
        amount: '',
        category: '',
        description: '',
        expenseDate: '',
      });
      setErrors({});
      setServerError('');
    }
    // [initialData] Tells React when to re-run the code inside useEffect. If changes, run again.
  }, [initialData]);


  // Validate Form Completion
  function validate(f) {
    const e = {};
    if (!f.amount || Number.isNaN(Number(f.amount)) || Number(f.amount) <= 0) {
      e.amount = 'Enter a valid amount > 0';
    }
    if (!f.category.trim()) {
      e.category = 'Category is required';
    }
    if (!f.expenseDate) {
      e.expenseDate = 'Date is required';
    }
    return e;
  }

  // Function - Changes to Expense Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear Errors for Fields
    if (errors[name]) setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  // Function - Submit Add / Update Expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear Old Errors
    setServerError('');

    //1. Invoke Validation
    const v = validate(form);
    setErrors(v);

    // If Invalid - Stop
    if (Object.keys(v).length) return;

    // If Valid - Continue
    setSubmitting(true);

    try {
      //2. Create New Expense Object from Fields
      const expenseData = {
        id: form.id, // Undefined for Add, Defined for Edit
        amount: Number(form.amount),
        category: form.category.trim(),
        description: form.description.trim(),
        expenseDate: form.expenseDate,
      };

      //3. Send to Parent(Expense.js)
      await onSubmit(expenseData);

      //4. After Completion... 
      // If Edit Mode, Exit After Save
      if (isEditMode) {
        if (onCancelEdit) {
          onCancelEdit();
        }
      }
      // If Add Mode, Reset Form        
      else {
        setForm({
          id: undefined,
          amount: '',
          category: '',
          description: '',
          expenseDate: '',
        });
        setErrors({});
      }
    } catch (err) {
      setServerError(err.message || 'Failed to save expense.');
    } finally {
      // Reset Submission Boolean Value
      setSubmitting(false);
    }
  };

  // Expense Form Display + Save Expense Button
  return (
    <Box className="form-group"
      sx={{ display: "flex", flexDirection: "column", gap: 3.5}}>
      {/* Change heading based on mode */}
      <Typography sx={{ color: '#8f1321', fontWeight: 'bold', fontSize: '25px', marginTop: 1 }}>
        {isEditMode ? 'Edit Expense' : 'Add Expense'}
      </Typography>

      {/* Show top-level server error (e.g., network failure) */}
      {serverError && <div className="error">{serverError}</div>}

      {/* Expense Form + Invoke Submission*/}
      <form className="expense-form" onSubmit={handleSubmit}>

        {/* Expense Amount Field */}
        <Typography sx={{ color: 'brand-black', fontWeight: 'bold' }}>
          Amount:
        </Typography>
        <TextField className='input' sx={{ display: "flex", flexDirection: "column", gap: 3.5, marginTop: 1, marginBottom: 2 }}
          label=""
          type="text"
          id="amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        {/* Inline Field Validation Message */}
        {errors.amount && <p className="error">{errors.amount}</p>}

        {/* Expense Category Field */}
        <Typography sx={{ color: 'brand-black', fontWeight: 'bold' }}>
          Category:
        </Typography>
        <TextField className='input' sx={{ display: "flex", flexDirection: "column", gap: 3.5, marginTop: 1, marginBottom: 2 }}
          label=""
          type="text"
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required

        />

        {/* Inline Field Validation Message */}
        {errors.category && <p className="error">{errors.category}</p>}

        {/* Expense Description Field */}
        <Typography sx={{ color: 'brand-black', fontWeight: 'bold' }}>
          Description:
        </Typography>
        <TextField className='input' sx={{ display: "flex", flexDirection: "column", marginTop: 1, marginBottom: 2 }}
          label=""
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        {/* Expense Date Field */}
        <Typography sx={{ color: 'brand-black', fontWeight: 'bold' }}>
          Transaction Date:
        </Typography>
        <TextField className='input' sx={{ display: "flex", flexDirection: "column", gap: 3.5, marginTop: 1, marginBottom: 2 }}
          label=""
          type="date"
          id="expenseDate"
          name="expenseDate"
          value={form.expenseDate}
          onChange={handleChange}
          required
        />

        {/* Inline Field Validation Message */}
        {errors.expenseDate && <p className="error">{errors.expenseDate}</p>}

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {isEditMode ? 'Update Expense' : 'Save Expense'}
          </button>

          {/* Show Cancel Only when Editing */}
          {isEditMode && onCancelEdit && (
            <button
              type="button"
              className="secondary-btn"
              onClick={onCancelEdit}
              disabled={submitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form >
    </Box >
  );
}