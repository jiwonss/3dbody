package com.ssafy.backend.domain.routine.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Routine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routineId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String title;
}
