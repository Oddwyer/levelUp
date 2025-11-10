package com.levelup.backend.controller;

import com.levelup.backend.model.Expense;
import com.levelup.backend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @GetMapping
    public List<Expense> getExpenses(@RequestParam(required = false) Long userId) {
        // If user ID provided, filter by user
        if (userId != null) {
            return expenseRepository.findByUserId(userId);
        }
        // Otherwise return all (will remove once sure this works)
        return expenseRepository.findAll();
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {
        Optional<Expense> existing = expenseRepository.findById(id);

        if (existing.isEmpty()) {
            throw new RuntimeException("ID doesn't work " + id);
        }

        Expense expense = existing.get();

        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setExpenseDate(updatedExpense.getExpenseDate());
        expense.setDescription(updatedExpense.getDescription());

        return expenseRepository.save(expense);
    }
    //TODO: add deleteExpense next
}