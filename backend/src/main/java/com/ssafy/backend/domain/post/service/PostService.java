package com.ssafy.backend.domain.post.service;

import com.ssafy.backend.domain.post.dto.PostDto;

public interface PostService {

    public Long save(PostDto requestDto, Long userId);     //글쓰기
    public PostDto findById(Long id);                   //글 조회
}
