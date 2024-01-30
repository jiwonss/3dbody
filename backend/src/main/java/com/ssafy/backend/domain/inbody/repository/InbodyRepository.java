package com.ssafy.backend.domain.inbody.repository;

import com.ssafy.backend.domain.inbody.entity.Inbody;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InbodyRepository extends JpaRepository<Inbody, Long> {
}
