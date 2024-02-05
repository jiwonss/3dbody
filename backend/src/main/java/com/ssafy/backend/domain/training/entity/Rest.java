package com.ssafy.backend.domain.training.entity;

import com.ssafy.backend.domain.user.entity.User;
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
@EqualsAndHashCode(of = {"restId"})
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_user_id_and_date", columnNames = {"user_id", "date"})
        }
)
public class Rest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restId; // 운동휴식 ID, BIGINT, PK

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private LocalDate date;

//    @ColumnDefault("FALSE")
//    private boolean isRest;

}
