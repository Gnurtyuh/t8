package com.project.t8.service.admin;

import com.project.t8.dto.UserDto;
import com.project.t8.dto.DepartmentDto;
import com.project.t8.entity.Department;
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
    @Autowired
    private DepartmentService departmentService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User createUser(UserDto userDto) {
        Department department = departmentService.dtoMapEntity(userDto.getDepartmentDto());
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setDepartmentId(department.getDepartmentId());
        user.setRoleLevel(userDto.getRoleLevel());
        user.setPassword(encoder.encode(userDto.getPassword()).getBytes(StandardCharsets.UTF_8));
        return userRepo.save(user);
    }

    // public UserDto getInforUser(User user) {
    // Department department = departmentService.getDepartmentById()
    // }
}