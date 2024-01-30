package com.ssafy.backend.domain.inbody.entity;

import jakarta.persistence.*;

@Entity
public class InbodyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inbodyImageId;

    @ManyToOne
    @JoinColumn(name = "inbody_id")
    private Inbody inbody;

    private String url;

}
