package com.ssafy.backend.domain.challenge.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = {"challengeId"}, callSuper = false)
@NamedEntityGraph
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId; // 챌린지ID, BIGINT, Primary Key

    // @ManyToOne
    // private User user; // 작성자ID, BIGINT, Foreign Key, NOT NULL

    @Column(nullable = false)
    private String title; // 챌린지이름, VARCHAR(100), NOT NULL

    @Column(nullable = false)
    private String content; // 내용, TEXT, NOT NULL

    private String thumbnail; // 썸네일, VARCHAR(255)

    private String image; // 이미지, VARCHAR(255)

    @ColumnDefault("0")
    private int entry = 0; // 참가자수, INT, default(0)

    @ColumnDefault("0")
    private int hit = 0; // 조회수, INT, default(0)

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status; // 상태, ENUM, NOT NULL

    private LocalDateTime startDate; // 시작날짜, TIMESTAMP NOT NULL

    private LocalDateTime endDate; // 종료날짜, TIMESTAMP NOT NULL

}
