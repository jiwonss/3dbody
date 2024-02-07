package com.ssafy.backend.domain.routine.entity;

import com.ssafy.backend.domain.training.entity.Training;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RoutineTrainingList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long RoutineTrainingListId;

    @ManyToOne
    @JoinColumn(name = "training_id")
    private Training training; // 운동 ID

    @ManyToOne
    @JoinColumn(name = "Routine_id")
    private Routine routine; // 루틴 ID

    private String name;
    private int sequence;
    private float kg;
    private int count;
    private int sets;
}
