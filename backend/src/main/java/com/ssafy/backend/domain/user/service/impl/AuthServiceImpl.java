package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Override
    public void signup(User user) {
        System.out.println(user.toString());
    }
}
