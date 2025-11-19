package com.levelup.backend.controller;

import com.levelup.backend.model.Budget;
import com.levelup.backend.model.User;
import com.levelup.backend.repository.BudgetRepository;
import com.levelup.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budget")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    // Constructor injection ensures repositories are not null
    public BudgetController(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    // CREATE a new budget for a user
    @PostMapping
    public Budget createBudget(@RequestBody Budget budget, @RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        budget.setUser(user);
        return budgetRepository.save(budget);
    }

    // READ all budgets for a user
    @GetMapping
    public List<Budget> getBudgets(@RequestParam Long userId) {
        return budgetRepository.findByUserId(userId);
    }

    // UPDATE a budget owned by a user
    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id,
                               @RequestBody Budget budgetDetails,
                               @RequestParam Long userId) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (budget.getUser().getId() != userId) {
            throw new RuntimeException("Unauthorized: budget does not belong to user");
        }

        budget.setCategory(budgetDetails.getCategory());
        budget.setMonthlyLimit(budgetDetails.getMonthlyLimit());
        budget.setStartDate(budgetDetails.getStartDate());
        budget.setEndDate(budgetDetails.getEndDate());

        return budgetRepository.save(budget);
    }

    // DELETE a budget owned by a user
    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id, @RequestParam Long userId) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (budget.getUser().getId() != userId) {
            throw new RuntimeException("Unauthorized: budget does not belong to user");
        }

        budgetRepository.delete(budget);
        return "Budget deleted successfully.";
    }
}