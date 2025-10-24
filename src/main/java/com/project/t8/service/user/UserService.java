package com.project.t8.service.user;

import com.project.t8.dto.DepartmentDto;
import com.project.t8.dto.UserDto;
import com.project.t8.entity.Department;
import com.project.t8.entity.User;

import com.project.t8.repository.UserRepo;
import com.project.t8.service.admin.DepartmentService;
import jakarta.persistence.EntityNotFoundException;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private DepartmentService departmentService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    // public User updateUser(UserDto userDto) {
    // return userRepo.save(dtoMapEntity(userDto));
    // }
    public void ChangePassword(Long userid, String currrentPassword, String newPassword) {

        User user = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("User not found"));
        String encodePassword = new String(user.getPassword());
        if (!passwordEncoder.matches(currrentPassword, encodePassword)) {
            throw new RuntimeException("Mật khẩu không khớp vui lòng nhập lại");
        }
        if (newPassword.length() < 9) {
            throw new RuntimeException("Mật khẩu mới phải có ít nhất 9 ký tự");
        }
        user.setPassword(passwordEncoder.encode(newPassword).getBytes());
        userRepo.save(user);
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public User findByUserId(long userId) {
        return userRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public UserDto entityMapDto(User user) {
        UserDto userDto = new UserDto();
        Department department = departmentService.getDepartmentById(user.getDepartmentId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setDepartmentDto(departmentService.entityMapDto(department));
        userDto.setFullName(user.getFullName());
        userDto.setRoleLevel(user.getRoleLevel());
        return userDto;
    }

    public User dtoMapEntity(UserDto userDto) {
        User user = findByUsername(userDto.getUsername());
        DepartmentDto departmentDto = userDto.getDepartmentDto();
        user.setDepartmentId(departmentService.dtoMapEntity(departmentDto).getDepartmentId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setFullName(userDto.getFullName());
        user.setRoleLevel(userDto.getRoleLevel());
        return user;
    }
}
