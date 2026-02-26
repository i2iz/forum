package com.i2iz.forum.repository;

import com.i2iz.forum.entity.Board;
import com.i2iz.forum.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    // 최근 10일 이내 수정된 공지사항 조회
    List<Board> findByCategoryNameAndUpdatedAtAfterOrderByCreatedAtDesc(String categoryName, LocalDateTime date);

    // 공지사항을 제외한 일반 게시글 페이징 조회
    Page<Board> findByCategoryNameNotOrderByCreatedAtDesc(String categoryName, Pageable pageable);
}