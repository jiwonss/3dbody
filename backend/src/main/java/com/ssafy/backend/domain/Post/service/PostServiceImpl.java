package com.ssafy.backend.domain.Post.service;

import com.ssafy.backend.domain.Post.dto.PostDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PostServiceImpl implements PostService{
    @Override
    public void writePost(PostDto postDto) throws Exception {
        
    }

    @Override
    public List<PostDto> listPost(Map<String, String> map) throws Exception {
        return null;
    }

    @Override
    public PostDto getPost(int postId) throws Exception {
        return null;
    }

    @Override
    public void updateHit(int postId) throws Exception {

    }

    @Override
    public void modifyPost(PostDto postDto) throws Exception {

    }

    @Override
    public void deletePost(PostDto postDto) throws Exception {

    }
}
