package com.project.t8.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.t8.service.AuthenticationService;
import org.springframework.security.core.Authentication;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Kiem tra jwt token cho tat ca request
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private AuthenticationService authenticationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        // Bo qua kiem tra jwt cho cac duong dam admin
        if (path.startsWith("/admin")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Lay token tu header authorization
        if (path.equals("/user/auth")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (authenticationService.validateToken(token)) {
                Authentication authentication = authenticationService.getAuthentication(token);

                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);

    }

}