package com.ssafy.backend.domain.inbody.entity;

import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class InbodyImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inbodyImageId;

    @ManyToOne
    @JoinColumn(name = "inbody_id")
    private Inbody inbody;

    private String url;

}
