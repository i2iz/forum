package com.i2iz.forum.repository;

import com.i2iz.forum.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    // 공지사항 조회
    List<Board> findByCategoryNameAndUpdatedAtAfterOrderByCreatedAtDesc(String categoryName, LocalDateTime date);

    // 검색어가 없을 때: 공지사항 제외 전체 조회
    Page<Board> findByCategoryNameNotOrderByCreatedAtDesc(String categoryName, Pageable pageable);

    // 제목 검색
    Page<Board> findByCategoryNameNotAndTitleContainingOrderByCreatedAtDesc(String categoryName, String title, Pageable pageable);

    // 내용 검색
    Page<Board> findByCategoryNameNotAndContentContainingOrderByCreatedAtDesc(String categoryName, String content, Pageable pageable);

    // 작성자 닉네임 검색
    @Query("SELECT b FROM Board b WHERE b.category.name <> :categoryName AND b.writer.nickname LIKE %:nickname% ORDER BY b.createdAt DESC")
    Page<Board> findByNickname(@Param("categoryName") String categoryName, @Param("nickname") String nickname, Pageable pageable);

    @Query(value = "SELECT b.* FROM board b " +
            "JOIN ( " +
            "    SELECT id FROM board " +
            "    WHERE category_id <> (SELECT id FROM category WHERE name = :noticeCategory) " +
            "    ORDER BY id DESC " +
            "    LIMIT :limit OFFSET :offset " +
            ") as temp ON b.id = temp.id",
            nativeQuery = true)
    List<Board> findPostsDeferredJoin(@Param("noticeCategory") String noticeCategory,
                                      @Param("limit") int limit,
                                      @Param("offset") int offset);

    @Query("SELECT COUNT(b) FROM Board b WHERE b.category.name <> :categoryName")
    long countByCategoryNameNot(@Param("categoryName") String categoryName);
}