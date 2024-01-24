package com.ssafy.backend.global.jwt.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class TokenRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void save(String key, String value, long expiresMin) {
        if (expiresMin > 0) {
            redisTemplate.opsForValue().set(key, value, Duration.ofMinutes(expiresMin));
            redisTemplate.expire(key, expiresMin, TimeUnit.MINUTES);
        }
    }

    public Optional<String> find(String key) {
        String value = redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(value);
    }

    public void delete(final String key) {
        redisTemplate.delete(key);
    }

    public boolean hasKey(final String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

}
