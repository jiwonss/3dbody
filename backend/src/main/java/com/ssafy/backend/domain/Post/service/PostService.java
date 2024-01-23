package com.ssafy.backend.domain.Post.service;

import com.ssafy.backend.domain.Post.dto.PostDto;

import java.util.List;
import java.util.Map;

public interface PostService {
    void writePost(PostDto postDto) throws Exception;
    List<PostDto> listPost(Map<String, String> map) throws Exception;
    PostDto getPost(int postId) throws Exception;
    void updateHit(int postId) throws Exception;
    void modifyPost(PostDto postDto) throws Exception;
    void deletePost(PostDto postDto) throws Exception;
}
