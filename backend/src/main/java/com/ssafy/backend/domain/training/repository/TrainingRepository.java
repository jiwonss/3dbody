package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingRepository extends JpaRepository<Training, Long>, TrainingCustomRepository {
}
