package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.dto.PasswordRequestDto;
import com.ssafy.backend.domain.user.dto.PinRequestDto;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean checkPassword(Long userId, String password) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    @Transactional
    public void updatePassword(User user, String password) {
        user.updatePassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public void changePassword(Long userId, PasswordRequestDto passwordRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        if (!passwordEncoder.matches(passwordRequestDto.getCurrentPassword(), user.getPassword())) {
            throw new UserException(INVALID_PASSWORD);
        }
        updatePassword(user, passwordRequestDto.getNewPassword());
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
    @Transactional
    public void updateUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
    }

    @Override
    @Transactional
    public void updateNickname(Long userId, String nickname) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        if (userRepository.existsByNickname(nickname)) {
            throw new UserException(DUPLICATED_NICKNAME);
        }
        user.updateNickname(nickname);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateStatus(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        user.updateStatus(User.Status.WITHDRAWAL);
        userRepository.save(user);
    }

    @Override
    public boolean duplicateCheckNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public boolean checkPin(Long userId, String pin) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        return user.getPin().equals(pin);
    }

    @Override
    @Transactional
    public void updatePin(User user, String pin) {
        user.updatePin(pin);
        userRepository.save(user);
    }

    @Override
    public void createPin(Long userId, PinRequestDto pinRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        updatePin(user, pinRequestDto.getNewPin());
    }

    @Override
    public void changePin(Long userId, PinRequestDto pinRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        if (!user.getPin().equals(pinRequestDto.getCurrentPin())) {
            throw new UserException(INVALID_PIN);
        }
        updatePin(user, pinRequestDto.getNewPin());
    }

    @Override
    public void deletePin(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        updatePin(user, null);
    }


}
