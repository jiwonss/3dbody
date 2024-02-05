package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.entity.UserTraining;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTrainingRepository extends JpaRepository<UserTraining, Long>, UserTrainingCustomRepository {
}
