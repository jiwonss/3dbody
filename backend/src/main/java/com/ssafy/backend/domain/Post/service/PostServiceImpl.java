package com.ssafy.backend.domain.Post.service;

import com.ssafy.backend.domain.Post.dto.PostDto;
import com.ssafy.backend.domain.Post.entity.Post;
import com.ssafy.backend.domain.Post.repository.PostRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    /* create 게시글 작성 */
//    @Transactional
//    public Long save(PostDto requestDto, Long userId){
//        Optional<User> opt = userRepository.findById(userId);
//        User user = opt.get();
//        String nickname = user.getNickname();
//        Post post = requestDto.toEntity();
//        postRepository.save(post);
//        return post.getPostId();
//    }
    @Transactional
    public Long save(PostDto requestDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("No User found with ID: " + userId));
        String nickname = user.getNickname();
        Post post = requestDto.toEntity();
        postRepository.save(post);
        return post.getPostId();
    }

    /* read 게시글 리스트 조회 */
    @Transactional(readOnly = true)
    public PostDto findById(Long postId){
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("No found with postId" + postId));
        return PostDto.toDto(post);
    }


    /* read 게시글 상세 조회 */



    /* update 조회수 업데이트 */


    /* update 게시글 수정 */


    /* delete 게시글 삭제 */

}
