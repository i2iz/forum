package com.i2iz.forum.service;

import com.i2iz.forum.entity.Board;
import com.i2iz.forum.entity.Category;
import com.i2iz.forum.entity.Member;
import com.i2iz.forum.repository.BoardRepository;
import com.i2iz.forum.repository.CategoryRepository;
import com.i2iz.forum.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public Long write(Board board, String loginId, Long categoryId) {
        Member writer = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

        board.setWriter(writer);
        board.setCategory(category);

        return boardRepository.save(board).getId();
    }

    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    public Board findById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시글입니다."));
    }
}