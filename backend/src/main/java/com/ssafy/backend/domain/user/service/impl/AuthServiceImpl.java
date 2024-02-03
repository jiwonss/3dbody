package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.dto.SignupRequestDto;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.AuthService;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.error.exception.UserException;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import com.ssafy.backend.global.jwt.repository.TokenRepository;
import com.ssafy.backend.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void signup(SignupRequestDto signupRequestDto) {
        if (userRepository.countByEmail(signupRequestDto.getEmail()) > 0) {
            userRepository.findByEmail(signupRequestDto.getEmail()).ifPresent(user -> {
                if (user.getStatus() == User.Status.WITHDRAWAL) {
                    throw new UserException(WITHDRAW_USER);
                }
            });
            throw new UserException(DUPLICATED_USER);
        }

        User user = signupRequestDto.toEntity();

        user.updateNickname(userService.nicknameGenerator());

        String password = passwordEncoder.encode(user.getPassword());
        user.updatePassword(password);
        userRepository.save(user);
    }

    @Override
    public UserInfoDto login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserException(INVALID_EMAIL));

        if (user.getStatus() == User.Status.WITHDRAWAL) {
            throw new UserException(WITHDRAW_USER);
        }

        String savedPassword = user.getPassword();
        if (!passwordEncoder.matches(password, savedPassword)) {
            throw new UserException(INVALID_PASSWORD);
        }

        return UserInfoDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .role(user.getRole().toString())
                .build();
    }

    @Override
    @Transactional
    public TokenDto reissue(String refreshToken) {
        Long id = jwtService.parseRefreshToken(refreshToken);
        User user = userRepository.findById(id).orElseThrow(() -> new UserException(INVALID_USER));
        UserInfoDto userInfo = UserInfoDto.from(user);

        tokenRepository.delete(String.valueOf(id));
        return jwtService.issueToken(userInfo);
    }

    @Override
    public boolean duplicateCheckEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
