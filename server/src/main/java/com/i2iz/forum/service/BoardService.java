package com.i2iz.forum.service;

import com.i2iz.forum.entity.*;
import com.i2iz.forum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final RecommendationRepository recommendationRepository;
    private final StringRedisTemplate redisTemplate;

    private static final String POST_COUNT_KEY = "board:post:count";
    private final String NOTICE_CATEGORY = "공지사항";

    @Transactional
    public Long write(Board board, String loginId, Long categoryId) {
        Member writer = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

        if (NOTICE_CATEGORY.equals(category.getName()) && writer.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("공지사항은 관리자만 작성할 수 있습니다.");
        }

        board.setWriter(writer);
        board.setCategory(category);
        Long id = boardRepository.save(board).getId();

        if (!NOTICE_CATEGORY.equals(category.getName())) {
            redisTemplate.opsForValue().increment(POST_COUNT_KEY);
        }

        return id;
    }

    public List<Board> getNotices() {
        LocalDateTime tenDaysAgo = LocalDateTime.now().minusDays(10);
        return boardRepository.findByCategoryNameAndUpdatedAtAfterOrderByCreatedAtDesc("공지사항", tenDaysAgo);
    }

    public Page<Board> getPosts(int page, String searchType, String keyword) {
        int pageSize = 25;
        PageRequest pageRequest = PageRequest.of(page, 25);
        String noticeCategory = "공지사항";

        if (keyword == null || keyword.isBlank()) {
            int offset = page * pageSize;
            List<Board> content = boardRepository.findPostsDeferredJoin(NOTICE_CATEGORY, pageSize, offset);

            String count = redisTemplate.opsForValue().get(POST_COUNT_KEY);
            long total = (count != null) ? Long.parseLong(count) : 0L;

            return new PageImpl<>(content, pageRequest, total);
        }

        switch (searchType) {
            case "title":
                return boardRepository.findByCategoryNameNotAndTitleContainingOrderByCreatedAtDesc(noticeCategory, keyword, pageRequest);
            case "content":
                return boardRepository.findByCategoryNameNotAndContentContainingOrderByCreatedAtDesc(noticeCategory, keyword, pageRequest);
            case "nickname":
                return boardRepository.findByNickname(noticeCategory, keyword, pageRequest);
            default:
                return boardRepository.findByCategoryNameNotOrderByCreatedAtDesc(noticeCategory, pageRequest);
        }
    }

    public Board findById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시글입니다."));
    }

    @Transactional
    public void delete(Long boardId, String loginId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        if (!board.getWriter().getLoginId().equals(loginId)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        if (!NOTICE_CATEGORY.equals(board.getCategory().getName())) {
            redisTemplate.opsForValue().decrement(POST_COUNT_KEY);
        }

        boardRepository.delete(board);
    }

    @Transactional
    public int recommend(Long boardId, String loginId) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByLoginId(loginId).orElseThrow();

        Optional<Recommendation> recoOpt = recommendationRepository.findByBoardAndMember(board, member);
        LocalDateTime now = LocalDateTime.now();

        if (recoOpt.isPresent()) {
            Recommendation reco = recoOpt.get();
            if (reco.getLastRecommendedAt().toLocalDate().equals(now.toLocalDate())) {
                throw new RuntimeException("오늘은 이미 추천하셨습니다.");
            }
            reco.setLastRecommendedAt(now);
        } else {
            Recommendation reco = new Recommendation();
            reco.setBoard(board);
            reco.setMember(member);
            reco.setLastRecommendedAt(now);
            recommendationRepository.save(reco);
        }

        board.setRecommendCount(board.getRecommendCount() + 1);
        return board.getRecommendCount();
    }
}