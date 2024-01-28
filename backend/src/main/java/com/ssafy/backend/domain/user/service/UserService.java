package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.user.dto.PasswordRequestDto;

import com.ssafy.backend.domain.user.entity.User;

public interface UserService {

    boolean checkPassword(Long userId, String password);
    void updatePassword(User user, String password);
    void changePassword(Long userId, PasswordRequestDto passwordRequestDto);
    String getRandomNickname();
    String nicknameGenerator();
    User getUserInfo(Long userId);
    void updateUser(Long userId);
    void updateStatus(Long userId);
    void updateNickname(Long userId, String nickname);
    boolean duplicateCheckNickname(String nickname);

}
