package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.PasswordRequestDto;
import com.ssafy.backend.domain.user.dto.PinRequestDto;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // TODO 이메일, 이름, 닉네임, 성별, 키, 몸무게
    @GetMapping("/{userId}")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity getUserInfo(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success(userService.getUserInfo(userId)));
    }

    @PatchMapping("/{userId}")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity updateUser(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{userId}/password/check")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity checkPassword(@PathVariable Long userId, @RequestBody PasswordRequestDto passwordRequestDto) {
        if (!userService.checkPassword(userId, passwordRequestDto.getCurrentPassword())) {
            return ResponseEntity.ok(Response.fail("", "비밀번호가 맞지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/password")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity changePassword(@PathVariable Long userId, @RequestBody PasswordRequestDto passwordRequestDto) {
        try {
            userService.changePassword(userId, passwordRequestDto);
        } catch (UserException e) {
            return ResponseEntity.ok(Response.fail("", "현재 비밀번호가 일치하지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity withdraw(@PathVariable Long userId) {
        userService.updateStatus(userId);
        return ResponseEntity.ok(Response.success());
    }

    @GetMapping
    public ResponseEntity duplicateCheckNickname(@RequestParam String nickname) {
        if (userService.duplicateCheckNickname(nickname)) {
            return ResponseEntity.ok(Response.fail("", "중복된 닉네임이 존재합니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/nickname")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity updateNickname(@PathVariable Long userId, @RequestParam String nickname) {
        userService.updateNickname(userId, nickname);
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{userId}/pin/check")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity checkPin(@PathVariable Long userId, @RequestBody PinRequestDto pinRequestDto) {
        if (!userService.checkPin(userId, pinRequestDto.getCurrentPin())) {
            return ResponseEntity.ok(Response.fail("", "PIN이 맞지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{userId}/pin")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity createPin(@PathVariable Long userId, @RequestBody PinRequestDto pinRequestDto) {
        userService.createPin(userId, pinRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/pin")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity updatePin(@PathVariable Long userId, @RequestBody PinRequestDto pinRequestDto) {
        try {
            userService.changePin(userId, pinRequestDto);
        } catch (UserException e) {
            return ResponseEntity.ok(Response.fail("", "현재 PIN과 일치하지 않습니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

    @DeleteMapping("/{userId}/pin")
    @PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
    public ResponseEntity deletePin(@PathVariable Long userId) {
        userService.deletePin(userId);
        return ResponseEntity.ok(Response.success());
    }

    // TODO 업데이트 다 분리
    // - 닉네임 완료
    // - 이름, 성별, 키, 몸무게, 생년월일, 프로필 이미지
    @PatchMapping("/{userId}/name")
    public ResponseEntity updateName(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/gender")
    public ResponseEntity updateGender(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/height")
    public ResponseEntity updateHeight(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/weight")
    public ResponseEntity updateWeight(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/birthdate")
    public ResponseEntity updateBirthDate(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/profile")
    public ResponseEntity updateProfileImage(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

}

