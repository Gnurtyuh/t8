package com.project.t8.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.t8.dto.AuthenticationDto;
import com.project.t8.dto.Authentications;
import com.project.t8.service.AuthenticationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    
    @Autowired
    public AuthenticationService authenticationService;
    
    @PostMapping("/auth")
    public ResponseEntity<AuthenticationDto> Login(@RequestBody Authentications authentications){
            AuthenticationDto result = authenticationService.authenticate(authentications);
        return ResponseEntity.ok(result);
    }

}
