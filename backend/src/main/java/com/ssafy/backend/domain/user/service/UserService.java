package com.ssafy.backend.domain.user.service;

public interface UserService {

    void updatePassword(Long userId, String password);
    String getRandomNickname();
    String nicknameGenerator();

}
