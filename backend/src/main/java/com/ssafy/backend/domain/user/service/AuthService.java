package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.user.dto.SignupRequestDto;
import com.ssafy.backend.domain.user.entity.User;

import java.util.Optional;

public interface AuthService {

    void signup(SignupRequestDto signupRequestDto) throws Exception;

}
