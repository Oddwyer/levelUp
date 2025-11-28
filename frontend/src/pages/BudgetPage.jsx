import React, { useEffect, useState } from "react";
import { BudgetTable } from "../components/BudgetTable";
import { AddBudget } from "../components/AddBudget";
import Header from "../components/Header.jsx";

export default function BudgetPage() {
    const [budgets, setBudgets] = useState([]);
    const userId = 1; // hardcoded for now

    // Fetch budgets on mount
    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/budgets?userId=${userId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setBudgets(data);
        } catch (err) {
            console.error("Error fetching budgets:", err);
        }
    };

    const handleAddBudget = (newBudget) => {
        // Add new budget to state
        setBudgets((prev) => [...prev, newBudget]);
    };

    const handleEditBudget = async (id, updatedBudget) => {
        try {
            const response = await fetch(`http://localhost:8080/api/budgets/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBudget)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const updated = await response.json();

            setBudgets((prev) => prev.map(b => b.id === id ? updated : b));
        } catch (err) {
            console.error("Error updating budget:", err);
        }
    };

    const handleDeleteBudget = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/budgets/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setBudgets((prev) => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error("Error deleting budget:", err);
        }
    };

    return (
        <div>
            
            <AddBudget onAdd={handleAddBudget} />
            <BudgetTable items={budgets} onEdit={handleEditBudget} onDelete={handleDeleteBudget} />
        </div>
    );
}
