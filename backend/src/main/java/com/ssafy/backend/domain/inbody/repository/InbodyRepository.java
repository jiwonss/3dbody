package com.ssafy.backend.domain.inbody.repository;

import com.ssafy.backend.domain.inbody.entity.Inbody;
import com.ssafy.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InbodyRepository extends JpaRepository<Inbody, Long> {

    List<Inbody> findAllByUser(User user);

}
