import React, { useState } from 'react';
import './BudgetTabel.css';

export function BudgetTable({ items, onEdit, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ amount: '', category: '', description: '' });

    const total = items.reduce((sum, item) => sum + item.amount, 0);

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditForm({ amount: item.amount, category: item.category, description: item.description });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ amount: '', category: '', description: '' });
    };

    const saveEdit = (id) => {
        const amount = parseFloat(editForm.amount);
        if (Number.isNaN(amount) || amount <= 0) return;
        const updated = { id, amount, category: editForm.category.trim(), description: editForm.description.trim() };
        if (onEdit) onEdit(id, updated);
        cancelEdit();
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    return (
        <div className="budget-table-container">
            {items.length === 0 ? (
                <p className="no-items-message">No budget items yet.</p>
            ) : (
                <>
                    <table className="budget-table">
                        <thead>
                            <tr className="table-header">
                                <th className="table-header-cell">Category</th>
                                <th className="table-header-cell">Description</th>
                                <th className="table-header-cell amount-column">Amount</th>
                                <th className="table-header-cell actions-column">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                const rowClass = index % 2 === 0 ? 'table-row-white' : 'table-row-red';
                                const isEditing = editingId === item.id;
                                return (
                                    <tr key={item.id} className={rowClass}>
                                        <td className="table-cell">
                                            {isEditing ? (
                                                <input name="category" className="edit-input" value={editForm.category} onChange={handleEditChange} />
                                            ) : (
                                                item.category
                                            )}
                                        </td>
                                        <td className="table-cell">
                                            {isEditing ? (
                                                <input name="description" className="edit-input" value={editForm.description} onChange={handleEditChange} />
                                            ) : (
                                                item.description
                                            )}
                                        </td>
                                        <td className="table-cell amount-column">
                                            {isEditing ? (
                                                <input name="amount" type="number" className="edit-input amount-input" value={editForm.amount} onChange={handleEditChange} />
                                            ) : (
                                                `$${item.amount.toFixed(2)}`
                                            )}
                                        </td>
                                        <td className="table-cell actions-column">
                                            {isEditing ? (
                                                <>
                                                    <button className="action-button save-button" onClick={() => saveEdit(item.id)}>Save</button>
                                                    <button className="action-button cancel-button" onClick={cancelEdit}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="action-button edit-button" onClick={() => startEdit(item)}>Edit</button>
                                                    <button className="action-button delete-button" onClick={() => onDelete && onDelete(item.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="table-total">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">${total.toFixed(2)}</span>
                    </div>
                </>
            )}
        </div>
    );
}
