package com.ssafy.backend.domain.post.controller;

import com.ssafy.backend.domain.post.dto.PostDto;
import com.ssafy.backend.domain.post.dto.PostListDto;
import com.ssafy.backend.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FaqController {

    private final PostService postService;
    //작성
    @PostMapping("/faq/posts/{userId}")
    public ResponseEntity save(@RequestBody PostDto requestDto, @PathVariable("userId") Long userId){
        return ResponseEntity.ok(postService.save(requestDto, userId));
    }
    //조회
    @GetMapping("/faq/posts/{postId}")
    public ResponseEntity read(@PathVariable("postId") Long postId){
        return ResponseEntity.ok(postService.findById(postId));
    }
    //목록
    @GetMapping("/faq/posts/list")
    public ResponseEntity<?> getAllNoticePosts() {
        List<PostListDto> noticeList = postService.findAllByFaq();
        return ResponseEntity.ok(noticeList);
    }
}
