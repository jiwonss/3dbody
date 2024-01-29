package com.ssafy.backend.domain.post.service;

import com.ssafy.backend.domain.post.dto.PostDto;
import com.ssafy.backend.domain.post.dto.PostListDto;
import com.ssafy.backend.domain.post.entity.Category;

import java.util.List;

public interface PostService {

    public Long save(PostDto requestDto, Long userId);     //글쓰기
    public PostDto findById(Long id);                   //글 조회
    public List<PostListDto> findAllByNotice();
    public List<PostListDto> findAllByFaq();
}
