package com.ssafy.backend.domain.inbody.repository;

import com.ssafy.backend.domain.inbody.entity.InbodyImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InbodyImageRepository extends JpaRepository<InbodyImage, Long> {

    Optional<InbodyImage> findByUrl(String url);

}
