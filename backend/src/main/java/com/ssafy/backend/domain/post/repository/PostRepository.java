package com.ssafy.backend.domain.post.repository;


import com.ssafy.backend.domain.post.dto.PostDto;
import com.ssafy.backend.domain.post.dto.PostListDto;
import com.ssafy.backend.domain.post.entity.Category;
import com.ssafy.backend.domain.post.entity.Post;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    //notice 목록
    @Query("select new com.ssafy.backend.domain.post.dto.PostListDto(p.postId, p.createdAt, p.category, p.title) " +
    "from Post p " +
    "where p.category = 'NOTICE'")
    List<PostListDto> findAllByNotice();

    @Query("select new com.ssafy.backend.domain.post.dto.PostListDto(p.postId, p.createdAt, p.category, p.title) " +
            "from Post p " +
            "where p.category = 'FAQ'")
    List<PostListDto> findAllByFaq();

}


