package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.PasswordRequestDto;
import com.ssafy.backend.domain.user.dto.PinRequestDto;
import com.ssafy.backend.domain.user.dto.UpdateRequestDto;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
public class UserController {

    private final UserService userService;

    @GetMapping("/{user_id}")
    public ResponseEntity getUserInfo(@PathVariable("user_id") Long userId) {
        log.info("User 회원 정보 조회 - userId : {}", userId);
        
        return ResponseEntity.ok(Response.success(userService.getUserInfo(userId)));
    }

    @PatchMapping("/{user_id}")
    public ResponseEntity updateUser(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{user_id}/password/check")
    public ResponseEntity checkPassword(@PathVariable("user_id") Long userId, @RequestBody PasswordRequestDto passwordRequestDto) {
        log.info("User 비밀번호 확인 - passwordRequestDto : {}", passwordRequestDto);

        if (!userService.checkPassword(userId, passwordRequestDto.getCurrentPassword())) {
            return ResponseEntity.ok(Response.fail(HttpStatus.BAD_REQUEST.name(), "비밀번호가 맞지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/password")
    public ResponseEntity changePassword(@PathVariable("user_id") Long userId, @RequestBody PasswordRequestDto passwordRequestDto) {
        log.info("User 비밀번호 변경 - passwordRequestDto : {}", passwordRequestDto);
        
        try {
            userService.changePassword(userId, passwordRequestDto);
        } catch (UserException e) {
            return ResponseEntity.ok(Response.fail(HttpStatus.BAD_REQUEST.name(), "현재 비밀번호가 일치하지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity withdraw(@PathVariable("user_id") Long userId) {
        log.info("User 회원탈퇴 - userId : {}", userId);

        userService.updateStatus(userId);
        return ResponseEntity.ok(Response.success());
    }

    @GetMapping("/{user_id}/nickname")
    public ResponseEntity duplicateCheckNickname(@PathVariable("user_id") Long userId, @RequestParam String nickname) {
        log.info("User 닉네임 중복 확인 - nickname : {}", nickname);

        if (userService.duplicateCheckNickname(nickname)) {
            return ResponseEntity.ok(Response.fail(HttpStatus.BAD_REQUEST.name(), "중복된 닉네임이 존재합니다."));
        }
        return ResponseEntity.ok(Response.success());
    }
    @PostMapping("/{user_id}/pin/check")
    public ResponseEntity checkPin(@PathVariable("user_id") Long userId, @RequestBody PinRequestDto pinRequestDto) {
        log.info("User PIN 확인 - pinRequestDto : {}", pinRequestDto);

        if (!userService.checkPin(userId, pinRequestDto.getCurrentPin())) {
            return ResponseEntity.ok(Response.fail(HttpStatus.BAD_REQUEST.name(), "PIN이 맞지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{user_id}/pin")
    public ResponseEntity createPin(@PathVariable("user_id") Long userId, @RequestBody PinRequestDto pinRequestDto) {
        log.info("User PIN 생성 - pinRequestDto : {}", pinRequestDto);
        
        userService.createPin(userId, pinRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/pin")
    public ResponseEntity updatePin(@PathVariable("user_id") Long userId, @RequestBody PinRequestDto pinRequestDto) {
        log.info("User PIN 수정 - pinRequestDto : {}", pinRequestDto);
        
        try {
            userService.changePin(userId, pinRequestDto);
        } catch (UserException e) {
            return ResponseEntity.ok(Response.fail(HttpStatus.BAD_REQUEST.name(), "현재 PIN과 일치하지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @DeleteMapping("/{user_id}/pin")
    public ResponseEntity deletePin(@PathVariable("user_id") Long userId) {
        log.info("User PIN 삭제");
        
        userService.deletePin(userId);
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/name")
    public ResponseEntity updateName(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        log.info("User 이름 변경 - nickname : {}", updateRequestDto.getNickname());

        userService.updateName(userId, updateRequestDto.getName());
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/nickname")
    public ResponseEntity updateNickname(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        log.info("User 닉네임 변경 - nickname : {}", updateRequestDto.getNickname());

        userService.updateNickname(userId, updateRequestDto.getNickname());
        return ResponseEntity.ok(Response.success());
    }


    @PatchMapping("/{user_id}/gender")
    public ResponseEntity updateGender(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        log.info("User 성별 변경 - nickname : {}", updateRequestDto.getGender());
        
        userService.updateGender(userId, updateRequestDto.getGender());
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/height")
    public ResponseEntity updateHeight(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        log.info("User 키 변경 - height : {}", updateRequestDto.getHeight());

        userService.updateHeight(userId, updateRequestDto.getHeight());
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/weight")
    public ResponseEntity updateWeight(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        log.info("User 몸무게 변경 - height : {}", updateRequestDto.getWeight());

        userService.updateWeight(userId, updateRequestDto.getWeight());
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/birth-date")
    public ResponseEntity updateBirthDate(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        log.info("User 생년월일 변경 - birthDate : {}", updateRequestDto.getBirthDate());

        userService.updateBirthDate(userId, updateRequestDto.getBirthDate());
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/profile-image")
    public ResponseEntity updateProfileImage(@PathVariable("user_id") Long userId, @RequestBody UpdateRequestDto updateRequestDto) {
        log.info("User 프로필이미지 변경 - profileImage : {}", updateRequestDto.getProfileImage());

        userService.updateProfileImage(userId, updateRequestDto.getProfileImage());
        return ResponseEntity.ok(Response.success());
    }

}

