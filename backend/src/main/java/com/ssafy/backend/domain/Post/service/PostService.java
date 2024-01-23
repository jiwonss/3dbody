package com.ssafy.backend.domain.Post.service;

import com.ssafy.backend.domain.Post.dto.PostDto;

import java.util.List;
import java.util.Map;

public interface PostService {
    void writePost(PostDto postDto) throws Exception;           //글쓰기
    List<PostDto> getListPost(Map<String, String> map) throws Exception;       //글목록 조회
    PostDto getPost(Long postId) throws Exception;           //상세글조회
    void updateHit(Long postId) throws Exception;            //조회수 업데이트
    void updatePost(PostDto postDto) throws Exception;      //게시글 수정
    void deletePost(Long postId) throws Exception;      //게시글 삭제
}
