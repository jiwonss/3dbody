package com.ssafy.backend.domain.inbody.controller;

import com.ssafy.backend.domain.inbody.dto.InbodyRequestDto;
import com.ssafy.backend.domain.inbody.dto.InbodyResponseDto;
import com.ssafy.backend.domain.inbody.service.InbodyService;
import com.ssafy.backend.global.dto.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inbody")
@RequiredArgsConstructor
@PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) " +
        "and (#userId == authentication.principal.userId)")
public class InbodyController {

    private final InbodyService inbodyService;

    @PostMapping("/{userId}")
    public ResponseEntity registInbody(@PathVariable Long userId, @RequestBody InbodyRequestDto inbodyRequestDto) {
        inbodyService.registInbody(userId, inbodyRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PatchMapping("/{userId}/{inbodyId}")
    public ResponseEntity updateInbody(@PathVariable Long userId, @PathVariable Long inbodyId, @RequestBody InbodyRequestDto inbodyRequestDto) {
        inbodyService.updateInbody(userId, inbodyId, inbodyRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @GetMapping("/{userId}")
    public ResponseEntity getInbodyList(@PathVariable Long userId) {
        List<InbodyResponseDto> result = inbodyService.getInbodyList(userId);
        return ResponseEntity.ok(Response.success(result));
    }

    @DeleteMapping("/{userId}/{inbodyId}")
    public ResponseEntity deleteInbody(@PathVariable Long userId, @PathVariable Long inbodyId) {
        inbodyService.deleteInbody(userId, inbodyId);
        return ResponseEntity.ok(Response.success());
    }


}
