package com.i2iz.forum.component;

import com.i2iz.forum.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisCountInitializer {
    private final BoardRepository boardRepository;
    private final StringRedisTemplate redisTemplate;
    private static final String POST_COUNT_KEY = "board:post:count";

    @EventListener(ApplicationReadyEvent.class)
    public void initPostCount() {
        if (redisTemplate.opsForValue().get(POST_COUNT_KEY) == null) {
            long count = boardRepository.countByCategoryNameNot("공지사항");
            redisTemplate.opsForValue().set(POST_COUNT_KEY, String.valueOf(count));
        }
    }
}
