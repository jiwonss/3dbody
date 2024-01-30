package com.ssafy.backend.domain.inbody.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Inbody {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inbodyId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private float height;

    private  float weight;

    private int bmr;

    private float muscle;

    private float fatMass;

    private float fatPer;

    private float tbw;

    private float whr;

    private float bmi;

    private int score;

    private LocalDateTime date;

    @OneToMany(mappedBy = "inbody")
    private List<InbodyImage> inbodyImages;

}
