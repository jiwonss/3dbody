package com.ssafy.backend.domain.Post.service;

import com.ssafy.backend.domain.Post.dto.PostDto;
import com.ssafy.backend.domain.Post.entity.Post;
import com.ssafy.backend.domain.Post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository){
        this.postRepository = postRepository;
    }



    @Override
    public void writePost(PostDto postDto) throws Exception {
        Post post = Post.builder().build(); //user 입력 후에 작성
    }

    @Override
    public List<PostDto> getListPost(Map<String, String> map) throws Exception {
        return null;
    }

    @Override
    public PostDto getPost(Long postId) throws Exception {

        Post post = postRepository.findById(postId).orElse(null);
        //post 엔티티 postDto로 변환해서 return
        return null;
    }

    @Override
    public void updateHit(Long postId) throws Exception {

    }

    @Override
    public void updatePost(PostDto postDto) throws Exception {

    }

    @Override
    public void deletePost(Long postId) throws Exception {

    }
}
