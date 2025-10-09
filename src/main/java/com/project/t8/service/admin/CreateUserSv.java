package com.project.t8.service.admin;

import com.project.t8.dto.UserDto;
import com.project.t8.entity.User;
import com.project.t8.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.nio.charset.StandardCharsets;

@Service
public class CreateUserSv {
    @Autowired
    private UserRepo userRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    public UserDto createUser(UserDto userDto) {
        // Chuyen dto sang entity
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFullname(userDto.getFullname());
        user.setEmail(userDto.getEmail());
        user.setDepartmentId(userDto.getDepartmentId());
        user.setRolelevel(userDto.getRoleLevel());
        user.setPassword(encoder.encode(userDto.getPassword()).getBytes(StandardCharsets.UTF_8));
        User saveUser = userRepo.save(user);
        // Chuyen entity sang dto
        UserDto response = new UserDto();
        response.setFullName(user.getFullname());
        return response;
    }
}