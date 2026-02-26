package com.i2iz.forum.repository;

import com.i2iz.forum.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}