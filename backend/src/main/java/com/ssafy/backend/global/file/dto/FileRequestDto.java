package com.ssafy.backend.global.file.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class FileRequestDto {

    @JsonProperty("asset_id")
    private String assetId;

    @JsonProperty("avatar_url")
    private String avatarUrl;

}
