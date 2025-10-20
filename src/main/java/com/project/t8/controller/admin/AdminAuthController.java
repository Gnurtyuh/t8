package com.project.t8.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.t8.dto.AuthenticationDto;
import com.project.t8.dto.Authentications;
import com.project.t8.service.AuthenticationService;
import org.springframework.security.core.Authentication;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
// @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminAuthController {
    
    @Autowired
    public AuthenticationService authenticationService;

    @PostMapping("/adminauth")
    public ResponseEntity<AuthenticationDto> AdminLogin(@RequestBody Authentications authentications){
                 AuthenticationDto result = authenticationService.adminauthenticate(authentications);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/test")
public ResponseEntity<String> testToken(Authentication authentication) {
    return ResponseEntity.ok("Token hợp lệ, user = " + authentication.getName());
}
    



}
