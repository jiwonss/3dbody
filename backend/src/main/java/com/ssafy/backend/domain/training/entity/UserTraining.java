package com.ssafy.backend.domain.training.entity;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(of = {"userTrainingId"}, callSuper = false)
public class UserTraining extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userTrainingId; // 회원운동 ID, BIGINT, PK

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user; // 회원 ID, BIGINT, FK, NOT NULL

    @ManyToOne(optional = false)
    @JoinColumn(name = "training_id")
    private Training training; // 운동 ID, BIGINT, FK, NOT NULL

    @Column(nullable = false)
    private LocalDate date; // 날짜, TIMESTAMP, NOT NULL

    @ColumnDefault("0")
    @Column(nullable = false)
    private int sequence; // 순서, INT, NOT NULL

    @ColumnDefault("0")
    @Column(nullable = false)
    private float kg; // 무게, FLOAT, NOT NULL, DEFAULT 0

    @ColumnDefault("0")
    @Column(nullable = false)
    private int count; // 횟수, INT, NOT NULL, DEFAULT 0

    @ColumnDefault("0")
    @Column(nullable = false)
    private int sets; // 세트, INT, NOT NULL

    @ColumnDefault("FALSE")
    @Column(nullable = false)
    private boolean isFinished; // 완료여부, BOOLEAN, NOT NULL, DEFAULT 0

    public void updateIsFinished() {
        this.isFinished = !this.isFinished;
    }

}
