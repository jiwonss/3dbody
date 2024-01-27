package com.ssafy.backend.global.jwt.service;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Getter
@Component
public class JwtUtils {

    public static final String BEARER_PREFIX = "Bearer ";
    public static final String KEY_ID = "id";
    public static final String KEY_EMAIL = "email";
    public static final String KEY_ROLE = "role";

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expired-min.access}")
    private int accessTokenExpiredMin;

    @Value("${jwt.expired-min.refresh}")
    private int refreshTokenExpiredMin;

    private Key encodedKey;

    @PostConstruct
    private void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        encodedKey = Keys.hmacShaKeyFor(keyBytes);
    }

}
