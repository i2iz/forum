package com.i2iz.forum.repository;

import com.i2iz.forum.entity.Board;
import com.i2iz.forum.entity.Member;
import com.i2iz.forum.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    Optional<Recommendation> findByBoardAndMember(Board board, Member member);
}