package com.i2iz.forum.controller;

import com.i2iz.forum.dto.BoardCreateRequest;
import com.i2iz.forum.entity.Board;
import com.i2iz.forum.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public List<Board> list() {
        return boardService.findAll();
    }

    @PostMapping
    public Long write(@RequestBody BoardCreateRequest request, @AuthenticationPrincipal String loginId) {
        if (loginId == null) {
            throw new RuntimeException("로그인이 필요합니다.");
        }

        Board board = new Board();
        board.setTitle(request.getTitle());
        board.setContent(request.getContent());
        board.setTags(request.getTags());

        return boardService.write(board, loginId, request.getCategoryId());
    }

    @GetMapping("/{id}")
    public Board detail(@PathVariable Long id) {
        return boardService.findById(id);
    }
}