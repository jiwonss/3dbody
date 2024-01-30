package com.ssafy.backend.domain.inbody.service;

import com.ssafy.backend.domain.inbody.dto.InbodyRequestDto;

public interface InbodyService {

    void registInbody(Long userId, InbodyRequestDto inbodyRequestDto);

}
