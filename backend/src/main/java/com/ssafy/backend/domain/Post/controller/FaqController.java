package com.ssafy.backend.domain.Post.controller;

import com.ssafy.backend.domain.Post.dto.PostDto;
import com.ssafy.backend.domain.Post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FaqController {

    private final PostService postService;

//    @GetMapping("faq/posts/list")
//    public ResponseEntity list() {
//    }

    @PostMapping("/faq/posts/{userId}")
    public ResponseEntity save(@RequestBody PostDto requestDto, @PathVariable("userId") Long userId){
        return ResponseEntity.ok(postService.save(requestDto, userId));
    }

    @GetMapping("/faq/posts/{postId}")
    public ResponseEntity read(@PathVariable("postId") Long postId){
        return ResponseEntity.ok(postService.findById(postId));
    }
}
