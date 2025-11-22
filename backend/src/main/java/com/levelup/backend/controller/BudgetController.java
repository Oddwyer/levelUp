package com.levelup.backend.controller;

import com.levelup.backend.model.Budget;
import com.levelup.backend.model.DTO.BudgetDTO;
import com.levelup.backend.model.User;
import com.levelup.backend.repository.BudgetRepository;
import com.levelup.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetController(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Budget addBudget(@RequestBody BudgetDTO budgetDTO) {
        Budget budget = new Budget();
        budget.setAmount(budgetDTO.getAmount());
        budget.setCategory(budgetDTO.getCategory());
        budget.setDescription(budgetDTO.getDescription());

        if (budgetDTO.getUserId() != null) {
            User user = userRepository.findById(budgetDTO.getUserId())
                    .orElseThrow(() ->
                            new RuntimeException("User not found: " + budgetDTO.getUserId()));
            budget.setUser(user);
        } else {
            throw new RuntimeException("userId is required for creating a budget");
        }

        return budgetRepository.save(budget);
    }

    @GetMapping
    public List<Budget> getBudgets(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return budgetRepository.findByUserId(userId);
        }
        return budgetRepository.findAll();
    }

    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id, @RequestBody Budget updatedBudget) {
        Optional<Budget> existing = budgetRepository.findById(id);

        if (existing.isEmpty()) {
            throw new RuntimeException("Budget not found: " + id);
        }

        Budget budget = existing.get();

        budget.setAmount(updatedBudget.getAmount());
        budget.setCategory(updatedBudget.getCategory());
        budget.setDescription(updatedBudget.getDescription());


        return budgetRepository.save(budget);
    }

    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id) {
        Optional<Budget> existing = budgetRepository.findById(id);

        if (existing.isEmpty()) {
            throw new RuntimeException("Budget not found with ID: " + id);
        }

        budgetRepository.deleteById(id);
        return "Budget with ID " + id + " deleted successfully.";
    }
}