package com.ssafy.backend.domain.post.controller;

import com.ssafy.backend.domain.post.dto.PostDto;
import com.ssafy.backend.domain.post.dto.PostListDto;
import com.ssafy.backend.domain.post.entity.Category;
import com.ssafy.backend.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

    private final PostService postService;

    @PostMapping("/notice/posts/{userId}")
    public ResponseEntity save(@RequestBody PostDto requestDto, @PathVariable("userId") Long userId){
        return ResponseEntity.ok(postService.save(requestDto, userId));
    }

    @GetMapping("/notice/posts/{postId}")
    public ResponseEntity read(@PathVariable("postId") Long postId){
        log.info("확인");
        return ResponseEntity.ok(postService.findById(postId));
    }

    // notice 목록 조회
    @GetMapping("/notice/posts/list")
    public ResponseEntity<?> getAllNoticePosts() {
        List<PostListDto> noticeList = postService.findAllByNotice();
        return ResponseEntity.ok(noticeList);
    }

}
