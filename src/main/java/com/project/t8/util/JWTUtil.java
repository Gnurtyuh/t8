package com.project.t8.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.nimbusds.jwt.SignedJWT;

import lombok.experimental.NonFinal;

@Component
public class JWTUtil {
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;
    private final long EXPIRATION_TIME = 1000 * 60 * 60;

    public String getUsernameFromToken(String token){
           try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getSubject();
           } catch (Exception e) {
             throw new RuntimeException("Error parsing JWT", e);
           }
    }
    
    
    
    



}
