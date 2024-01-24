package com.ssafy.backend.domain.user.repository;

import com.ssafy.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    int countByEmail(String email);
    int countByNickname(String nickname);

}
