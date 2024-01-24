package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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


}
