package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.PasswordRequestDto;
import com.ssafy.backend.domain.user.dto.PinRequestDto;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // TODO 이메일, 이름, 닉네임, 성별, 키, 몸무게
    @GetMapping("/{user_id}")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity getUserInfo(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success(userService.getUserInfo(userId)));
    }

    @PatchMapping("/{user_id}")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity updateUser(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{user_id}/password/check")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity checkPassword(@PathVariable("user_id") Long userId, @RequestBody PasswordRequestDto passwordRequestDto) {
        log.info("비밀번호 확인 - passwordRequestDto : {}", passwordRequestDto);

        if (!userService.checkPassword(userId, passwordRequestDto.getCurrentPassword())) {
            return ResponseEntity.ok(Response.fail("", "비밀번호가 맞지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/password")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity changePassword(@PathVariable("user_id") Long userId, @RequestBody PasswordRequestDto passwordRequestDto) {
        log.info("비밀번호 변경 - passwordRequestDto : {}", passwordRequestDto);
        
        try {
            userService.changePassword(userId, passwordRequestDto);
        } catch (UserException e) {
            return ResponseEntity.ok(Response.fail("", "현재 비밀번호가 일치하지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @DeleteMapping("/{user_id}")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity withdraw(@PathVariable("user_id") Long userId) {
        log.info("회원탈퇴 - userId : {}", userId);

        userService.updateStatus(userId);
        return ResponseEntity.ok(Response.success());
    }

    @GetMapping
    public ResponseEntity duplicateCheckNickname(@RequestParam String nickname) {
        log.info("닉네임 중복 확인 - nickname : {}", nickname);

        if (userService.duplicateCheckNickname(nickname)) {
            return ResponseEntity.ok(Response.fail("", "중복된 닉네임이 존재합니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/nickname")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity updateNickname(@PathVariable("user_id") Long userId, @RequestParam String nickname) {
        log.info("닉네임 중복 확인 - nickname : {}", nickname);

        userService.updateNickname(userId, nickname);
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{user_id}/pin/check")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity checkPin(@PathVariable("user_id") Long userId, @RequestBody PinRequestDto pinRequestDto) {
        log.info("PIN 확인 - pinRequestDto : {}", pinRequestDto);

        if (!userService.checkPin(userId, pinRequestDto.getCurrentPin())) {
            return ResponseEntity.ok(Response.fail("", "PIN이 맞지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{user_id}/pin")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity createPin(@PathVariable("user_id") Long userId, @RequestBody PinRequestDto pinRequestDto) {
        log.info("PIN 생성 - pinRequestDto : {}", pinRequestDto);
        
        userService.createPin(userId, pinRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/pin")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity updatePin(@PathVariable("user_id") Long userId, @RequestBody PinRequestDto pinRequestDto) {
        log.info("PIN 수정 - pinRequestDto : {}", pinRequestDto);
        
        try {
            userService.changePin(userId, pinRequestDto);
        } catch (UserException e) {
            return ResponseEntity.ok(Response.fail("", "현재 PIN과 일치하지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @DeleteMapping("/{user_id}/pin")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity deletePin(@PathVariable("user_id") Long userId) {
        log.info("PIN 삭제");
        
        userService.deletePin(userId);
        return ResponseEntity.ok(Response.success());
    }

    // TODO 업데이트 다 분리
    // - 닉네임 완료
    // - 이름, 성별, 키, 몸무게, 생년월일, 프로필 이미지
    @PatchMapping("/{user_id}/name")
    public ResponseEntity updateName(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/gender")
    public ResponseEntity updateGender(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/height")
    public ResponseEntity updateHeight(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/weight")
    public ResponseEntity updateWeight(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/birthdate")
    public ResponseEntity updateBirthDate(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/profile")
    public ResponseEntity updateProfileImage(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(Response.success());
    }

}

