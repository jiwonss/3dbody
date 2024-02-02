package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.entity.Rest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestRepository extends JpaRepository<Rest, Long> {
}
