package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.user.dto.PasswordRequestDto;
import com.ssafy.backend.domain.user.dto.PinRequestDto;
import com.ssafy.backend.domain.user.dto.UserResponseDto;
import com.ssafy.backend.domain.user.entity.User;

public interface UserService {

    boolean checkPassword(Long userId, String password);
    void updatePassword(User user, String password);
    void changePassword(Long userId, PasswordRequestDto passwordRequestDto);
    String getRandomNickname();
    String nicknameGenerator();
    UserResponseDto getUserInfo(Long userId);
    void updateUser(Long userId);
    void updateStatus(Long userId);
    void updateNickname(Long userId, String nickname);
    boolean duplicateCheckNickname(String nickname);
    boolean checkPin(Long userId, String pin);
    void updatePin(User user, String pin);
    void createPin(Long userId, PinRequestDto pinRequestDto);
    void changePin(Long userId, PinRequestDto pinRequestDto);
    void deletePin(Long userId);
    void updateName(Long userId, String name);
    void updateGender(Long userId, User.Gender gender);
    void updateHeight(Long userId, float height);
    void updateWeight(Long userId, float weight);
    void updateBirthDate(Long userId, String birthDate);
    void updateProfileImage(Long userId, String profileImage);

}
