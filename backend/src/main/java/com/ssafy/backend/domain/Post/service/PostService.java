package com.ssafy.backend.domain.Post.service;

import com.ssafy.backend.domain.Post.dto.PostDto;

public interface PostService {

    public Long save(PostDto requestDto, Long userId);     //글쓰기
    public PostDto findById(Long postId);                   //글 조회
}
