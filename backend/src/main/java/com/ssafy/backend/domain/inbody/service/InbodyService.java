package com.ssafy.backend.domain.inbody.service;

import com.ssafy.backend.domain.inbody.dto.InbodyRequestDto;
import com.ssafy.backend.domain.inbody.dto.InbodyResponseDto;

import java.util.List;

public interface InbodyService {

    void registInbody(Long userId, InbodyRequestDto inbodyRequestDto);
    void updateInbody(Long userId, Long inbodyId, InbodyRequestDto inbodyRequestDto);
    List<InbodyResponseDto>  getInbodyList(Long userId);

}
