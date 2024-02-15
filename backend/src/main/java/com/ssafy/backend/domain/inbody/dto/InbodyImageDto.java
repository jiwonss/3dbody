package com.ssafy.backend.domain.inbody.dto;

import com.ssafy.backend.domain.inbody.entity.InbodyImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InbodyImageDto {

    private String url;

    public static InbodyImageDto of(InbodyImage inbodyImage) {
        return InbodyImageDto.builder()
                .url(inbodyImage.getUrl())
                .build();
    }

}
