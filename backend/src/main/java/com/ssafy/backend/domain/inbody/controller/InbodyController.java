package com.ssafy.backend.domain.inbody.controller;

import com.ssafy.backend.domain.inbody.dto.InbodyRequestDto;
import com.ssafy.backend.domain.inbody.dto.InbodyResponseDto;
import com.ssafy.backend.domain.inbody.service.InbodyService;
import com.ssafy.backend.global.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/inbody")
@RequiredArgsConstructor
@PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
public class InbodyController {

    private final InbodyService inbodyService;

    @PostMapping("/{user_id}")
    public ResponseEntity registInbody(@PathVariable("user_id") Long userId, @RequestBody InbodyRequestDto inbodyRequestDto) {
        inbodyService.registInbody(userId, inbodyRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{user_id}/{inbody_id}")
    public ResponseEntity updateInbody(@PathVariable("user_id") Long userId, @PathVariable("inbody_id") Long inbodyId, @RequestBody InbodyRequestDto inbodyRequestDto) {
        inbodyService.updateInbody(userId, inbodyId, inbodyRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @GetMapping("/{user_id}/{inbody_id}")
    public ResponseEntity getInbodyItem(@PathVariable("user_id") Long userId, @PathVariable("inbody_id") Long inbodyId) {
        InbodyResponseDto inbodyResponseDto = inbodyService.getInbodyItem(inbodyId);
        return ResponseEntity.ok(Response.success(inbodyResponseDto));
    }

    @GetMapping("/{user_id}")
    public ResponseEntity getInbodyList(@PathVariable("user_id") Long userId) {
        List<InbodyResponseDto> result = inbodyService.getInbodyList(userId);
        return ResponseEntity.ok(Response.success(result));
    }

    @DeleteMapping("/{user_id}/{inbody_id}")
    public ResponseEntity deleteInbody(@PathVariable("user_id") Long userId, @PathVariable("inbody_id") Long inbodyId) {
        inbodyService.deleteInbody(userId, inbodyId);
        return ResponseEntity.ok(Response.success());
    }


}
