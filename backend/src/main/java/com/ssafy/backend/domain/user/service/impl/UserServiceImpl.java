package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.ssafy.backend.global.error.exception.ExceptionType.DUPLICATED_NICKNAME;
import static com.ssafy.backend.global.error.exception.ExceptionType.INVALID_USER;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updatePassword(Long userId, String password) {
        User user = userRepository.findById(userId).orElseThrow();
        user.updatePassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public String getRandomNickname() {
        return "GUEST" + RandomStringUtils.random(6, false, true);
    }

    @Override
    public String nicknameGenerator() {
        String nickname = getRandomNickname();
        while (userRepository.countByNickname(nickname) > 0) {
            nickname = getRandomNickname();
        }
        return nickname;
    }

    @Override
    public User getUserInfo(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
    }

    @Override
    public void updateUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
    }

    @Override
    public void updateNickname(Long userId, String nickname) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        if (userRepository.existsByNickname(nickname)) {
            throw new UserException(DUPLICATED_NICKNAME);
        }
        user.updateNickname(nickname);
        userRepository.save(user);
    }

    @Override
    public void updateStatus(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        user.updateStatus(User.Status.WITHDRAWAL);
        userRepository.save(user);
    }

    @Override
    public boolean duplicateCheckNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }


}
