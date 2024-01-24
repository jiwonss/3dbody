package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.dto.SignupRequestDto;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.AuthService;
import com.ssafy.backend.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void signup(SignupRequestDto signupRequestDto) throws Exception {
        User user = signupRequestDto.toEntity();

        if (userRepository.countByEmail(user.getEmail()) > 0) {
            throw new Exception();
        }

        user.updateNickname(userService.nicknameGenerator());
        user.updatePassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

}
