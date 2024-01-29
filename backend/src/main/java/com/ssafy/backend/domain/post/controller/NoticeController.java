package com.ssafy.backend.domain.post.controller;

import com.ssafy.backend.domain.post.dto.PostDto;
import com.ssafy.backend.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NoticeController {

    private final PostService postService;

    @PostMapping("/notice/posts/{userId}")
    public ResponseEntity save(@RequestBody PostDto requestDto, @PathVariable("userId") Long userId){
        return ResponseEntity.ok(postService.save(requestDto, userId));
    }

    @GetMapping("/notice/posts/{postId}")
    public ResponseEntity read(@PathVariable("postId") Long postId){
        return ResponseEntity.ok(postService.findById(postId));
    }

}
