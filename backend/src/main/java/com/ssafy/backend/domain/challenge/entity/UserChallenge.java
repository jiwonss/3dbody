package com.ssafy.backend.domain.challenge.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = {"userChallengeId"}, callSuper = false)
@NamedEntityGraph
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_user_id_and_challenge_id", columnNames = {"challenge_id", "user_id"})
        }
)
public class UserChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userChallengeId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

}
