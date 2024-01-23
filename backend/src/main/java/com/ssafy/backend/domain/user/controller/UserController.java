package com.ssafy.backend.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/signup")
    public ResponseEntity signup() {
        System.out.println("test");
        return ResponseEntity.ok().build();
    }

}
