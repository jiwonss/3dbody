package com.ssafy.backend.domain.post.service;

import com.ssafy.backend.domain.post.dto.PostDto;
import com.ssafy.backend.domain.post.dto.PostListDto;
import com.ssafy.backend.domain.post.entity.Category;
import com.ssafy.backend.domain.post.entity.Post;
import com.ssafy.backend.domain.post.repository.PostRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    /* create 게시글 작성 */
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
    @Transactional
    public List<PostListDto> findAllByNotice() {
        return postRepository.findAllByNotice();
    }

    @Transactional
    public List<PostListDto> findAllByFaq() {
        return postRepository.findAllByFaq();
    }

    /* read 게시글 상세 조회 */
    @Transactional(rollbackFor = Exception.class)
    public PostDto findById(Long id){
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No found with postId" + id));
        return PostDto.toDto(post);
    }

    /* update 조회수 업데이트 */

    /* delete 게시글 삭제 */

}
