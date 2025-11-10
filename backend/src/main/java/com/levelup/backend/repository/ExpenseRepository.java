package com.levelup.backend.repository;

import com.levelup.backend.model.Expense;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository  extends JpaRepository<Expense, Long> {

    List<Expense> findByUserId(Long userId);
}