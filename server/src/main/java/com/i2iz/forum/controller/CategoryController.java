package com.i2iz.forum.controller;

import com.i2iz.forum.entity.Category;
import com.i2iz.forum.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<Category> list() {
        return categoryService.findAll();
    }

    // 관리자만 접근 가능하도록 설정해 보기
    @PostMapping
    public Category create(@RequestBody Category category) {
        return categoryService.save(category);
    }

    // 관리자만 접근 가능하도록 설정해 보기
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }
}