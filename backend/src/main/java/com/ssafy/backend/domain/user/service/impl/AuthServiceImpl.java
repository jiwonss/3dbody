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
    public void signup(SignupRequestDto signupRequestDto) {
        User user = signupRequestDto.toEntity();
        String password = passwordEncoder.encode(user.getPassword());

        if (userRepository.countByEmail(user.getEmail()) > 0) {
            throw new UserException(DUPLICATED_USER);
        }

        user.updateNickname(userService.nicknameGenerator());
        user.updatePassword(password);
        userRepository.save(user);
    }

    @Override
    public UserInfoDto login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserException(INVALID_EMAIL));
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
    public TokenDto reissue(String refreshToken) {
        Long id = jwtService.parseRefreshToken(refreshToken);
        User user = userRepository.findById(id).orElseThrow(() -> new UserException(INVALID_USER));
        UserInfoDto userInfo = UserInfoDto.from(user);

        tokenRepository.delete(String.valueOf(id));
        TokenDto tokenDto = jwtService.issueToken(userInfo);
        return tokenDto;
    }

    @Override
    public boolean duplicateCheckEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
