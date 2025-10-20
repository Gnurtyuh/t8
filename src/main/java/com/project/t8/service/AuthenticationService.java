package com.project.t8.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.project.t8.dto.AuthenticationDto;
import com.project.t8.entity.Admin;
import com.project.t8.entity.Authentications;
import com.project.t8.entity.User;
import com.project.t8.repository.AdminRepo;
import com.project.t8.repository.UserRepo;
import com.project.t8.util.TokenBlacklist;
import org.springframework.security.core.Authentication;
import lombok.var;
import lombok.experimental.NonFinal;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AdminRepo adminRepo;
    
    @Autowired
    private TokenBlacklist tokenBlacklist;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;
    @Autowired
    MyUserDetailsService myUserDetailsService;
    
    //return token user
    public AuthenticationDto authenticate(Authentications authentications){
        User user = userRepo.findByUsername(authentications.getName()).orElseThrow(()-> new RuntimeException("User not found"));
        PasswordEncoder encoder = new BCryptPasswordEncoder(10);
    
        boolean authenticated = encoder.matches(authentications.getPassword(), new String(user.getPassword()));
        if(!authenticated) throw new RuntimeException("password not match");
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(user.getUsername());
        

        UsernamePasswordAuthenticationToken authentoken = new UsernamePasswordAuthenticationToken( userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentoken);
        var token = generateToken(user);
        return AuthenticationDto.builder()
        .authenticated(true)
        .token(token)
        .build();
    }
    
    //gen token user
    public String generateToken(User users){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
        .subject(users.getUsername())
        .issuer("devteria.com")
        .issueTime(new Date())
        .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
        .claim("id", users.getUserId())
        .claim("role level", users.getRoleLevel())
        .jwtID(UUID.randomUUID().toString())
        .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new com.nimbusds.jose.crypto.MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (Exception e) {
            throw new RuntimeException("Error signing the token", e);
        }

    }
    
    //gen token admin
    public String admingenerateToken(Admin admin){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet jwtClaimsSet = new  JWTClaimsSet.Builder()
        .subject(admin.getUsername())
        .issuer("devteria.com")
        .issueTime(new Date())
        .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
        .claim("id", admin.getAdminId())
        .claim("role level", admin.getRoleLevel())
        .jwtID(UUID.randomUUID().toString())
        .build();
        
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try{
            jwsObject.sign(new com.nimbusds.jose.crypto.MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();

        }catch (Exception e) {
            throw new RuntimeException("Error signing the token", e);
        }
    }

    //return token admin
    public AuthenticationDto adminauthenticate(Authentications authentications){
        var admin = adminRepo.findByUsername(authentications.getName()).orElseThrow(()-> new RuntimeException("admin not found"));
        PasswordEncoder encoder = new BCryptPasswordEncoder(10);
    
        boolean authenticated = encoder.matches(authentications.getPassword(), new String(admin.getPassword()));
        if(!authenticated) throw new RuntimeException("password not match");
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(admin.getUsername());
        

        UsernamePasswordAuthenticationToken authentoken = new UsernamePasswordAuthenticationToken( userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentoken);
        var token = admingenerateToken(admin);
        return AuthenticationDto.builder()
        .authenticated(true)
        .token(token)
        .build();
    }
    //validate token

    public boolean validateToken(String token){
        try{
            JWSObject verifyJwsObject = JWSObject.parse(token);
            verifyJwsObject.verify(new MACVerifier(SIGNER_KEY.getBytes()) );
            JWTClaimsSet claims = JWTClaimsSet.parse(verifyJwsObject.getPayload().toJSONObject());
            Date expiration = claims.getExpirationTime();
            Date now = new Date();

            if (expiration.before(now)) {
                System.out.println("Token het han");
            return false;
            }

            if (!"devteria.com".equals(claims.getIssuer())) {
            return false;
            }

            if (tokenBlacklist.isBlacklisted(token)) {
            return false;
        }

        return true;

        }catch(Exception e){
            return false;
        }
    }

    //getauthenticatedverify
    public Authentication getAuthentication(String token) {
        try {
            JWSObject jwsObject = JWSObject.parse(token);
            jwsObject.verify(new MACVerifier(SIGNER_KEY.getBytes()));

            JWTClaimsSet claims = JWTClaimsSet.parse(jwsObject.getPayload().toJSONObject());

            String username = claims.getSubject();
            // int userId = claims.getIntegerClaim("id");
            UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);
            System.out.println(userDetails.getUsername());
            return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
            );

        } catch (Exception e) {
            return null;
        }
    }
            
}
