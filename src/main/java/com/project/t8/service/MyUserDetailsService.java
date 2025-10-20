package com.project.t8.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.t8.entity.Admin;
import com.project.t8.entity.CustomUserDetails;
import com.project.t8.entity.User;
import com.project.t8.repository.AdminRepo;
import com.project.t8.repository.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Optional<User> userOpt = userRepo.findByUsername(username);
        if(userOpt.isPresent()){
            User u = userOpt.get();
             return new CustomUserDetails(
                u.getUserId(),
                u.getUsername(),
                new String(u.getPassword()),
                "ROLE_USER",
                u.getRoleLevel()
        );
        }
        
        Optional<Admin> admin = adminRepo.findByUsername(username);
        if (admin.isPresent()) {
            Admin a = admin.get();
             return new CustomUserDetails(
                a.getAdminId(),
                a.getUsername(),
                new String(a.getPassword()),
                "ROLE_ADMIN",
                a.getRoleLevel()
        );
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }

        
    

}
