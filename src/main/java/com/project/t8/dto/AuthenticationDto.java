package com.project.t8.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationDto {
    String token;
    private boolean authenticated;
}

