package com.levelup.backend.controller;

import com.levelup.backend.model.DTO.ExpenseDTO;
import com.levelup.backend.model.Expense;
import com.levelup.backend.model.User;
import com.levelup.backend.repository.ExpenseRepository;
import com.levelup.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Expense addExpense(@RequestBody ExpenseDTO expenseDTO) {
        Expense expense = new Expense();
        expense.setAmount(expenseDTO.getAmount());
        expense.setCategory(expenseDTO.getCategory());
        expense.setDescription(expenseDTO.getDescription());
        expense.setExpenseDate(expenseDTO.getExpenseDate());

        if (expenseDTO.getUserId() != null) {
            User user = userRepository.findById(expenseDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found: " + expenseDTO.getUserId()));
            expense.setUser(user);
        } else {
            throw new RuntimeException("userId is required for creating an expense");
        }

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
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        Optional<Expense> existing = expenseRepository.findById(id);

        //checks if id exists
        if (existing.isEmpty()) {
            throw new RuntimeException("Expense not found with ID: " + id);
        }
        //deletes expense that correlates with id
        expenseRepository.deleteById(id);
        return "Expense with ID " + id + " deleted successfully.";
    }
}