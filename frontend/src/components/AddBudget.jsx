import React, { useState } from 'react';
import './AddBudget.css';

export function AddBudget({ onAdd }) {
    const [form, setForm] = useState({ amount: "", category: "", description: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const trimmedCategory = form.category.trim();
        const trimmedDescription = form.description.trim();
        const amount = parseFloat(form.amount);
        
        if (!form.amount || !trimmedCategory || !trimmedDescription) {
            setError("⚠️ Please fill in all fields.");
            return;
        }
        
        if (Number.isNaN(amount) || amount <= 0) {
            setError("⚠️ Please enter a valid positive amount.");
            return;
        }
        
        setError("");
        // Call parent's onAdd function to update items state
        onAdd({ amount, category: trimmedCategory, description: trimmedDescription });
        setForm({ amount: "", category: "", description: "" });
    };

    return (
        <div className="add-budget-container">
            <h2>Add Budget</h2>
            <form onSubmit={handleAdd} className="add-budget-form">
                {error && <div className="error-message">{error}</div>}

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-input"
                />
                <button type="submit" className="submit-button">
                    Add Item
                </button>
            </form>
        </div>
    );
}