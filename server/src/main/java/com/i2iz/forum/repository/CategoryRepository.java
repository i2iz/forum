package com.i2iz.forum.repository;

import com.i2iz.forum.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}