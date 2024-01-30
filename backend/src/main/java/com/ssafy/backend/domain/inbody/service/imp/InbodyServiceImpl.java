package com.ssafy.backend.domain.inbody.service.imp;

import com.ssafy.backend.domain.inbody.dto.InbodyRequestDto;
import com.ssafy.backend.domain.inbody.entity.Inbody;
import com.ssafy.backend.domain.inbody.repository.InbodyImageRepository;
import com.ssafy.backend.domain.inbody.repository.InbodyRepository;
import com.ssafy.backend.domain.inbody.service.InbodyService;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.backend.global.error.exception.ExceptionType.INVALID_USER;

@Service
@RequiredArgsConstructor
public class InbodyServiceImpl implements InbodyService {

    private final UserRepository userRepository;
    private final InbodyRepository inbodyRepository;
    private final InbodyImageRepository inbodyImageRepository;


    @Override
    public void registInbody(Long userId, InbodyRequestDto inbodyRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
        Inbody inbody = Inbody.builder()
                .user(user)
                .height(inbodyRequestDto.getHeight())
                .weight(inbodyRequestDto.getWeight())
                .bmr(inbodyRequestDto.getBmr())
                .muscle(inbodyRequestDto.getMuscle())
                .fatMass(inbodyRequestDto.getFatMass())
                .fatPer(inbodyRequestDto.getFatPer())
                .tbw(inbodyRequestDto.getTbw())
                .whr(inbodyRequestDto.getWhr())
                .bmi(inbodyRequestDto.getBmi())
                .score(inbodyRequestDto.getScore())
                .date(inbodyRequestDto.getDate())
                .build();
        inbodyRepository.save(inbody);
    }
}
