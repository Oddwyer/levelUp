/* pages/Budget.jsx
import React, { useState } from "react";
import Header from "../components/Header.jsx";
import { AddBudget } from "../components/AddBudget.jsx";
import { BudgetTable } from "../components/BudgetTable.jsx";

export default function BudgetPage() {
  const [items, setItems] = useState([]);

  const handleAdd = (newItem) => {
    setItems([...items, { ...newItem, id: Date.now() }]);
  };

  const handleEdit = (id, updated) => {
    setItems(items.map((it) => (it.id === id ? { ...it, ...updated } : it)));
  };

  const handleDelete = (id) => {
    setItems(items.filter((it) => it.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <Header/>
      <AddBudget onAdd={handleAdd} />
      <BudgetTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
} */
