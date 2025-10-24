package com.project.t8.service.admin;

import com.project.t8.dto.UserDto;
import com.project.t8.dto.DepartmentDto;
import com.project.t8.entity.Department;
import com.project.t8.entity.User;
import com.project.t8.repository.DepartmentRepo;
import com.project.t8.repository.DocumentRepo;
import com.project.t8.repository.UserRepo;
import com.project.t8.service.DocumentService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.lang.StackWalker.Option;
import java.lang.annotation.Documented;
import java.nio.charset.StandardCharsets;

import javax.management.RuntimeErrorException;

@Service
public class CreateUserSv {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private DepartmentRepo departmentRepo;
    @Autowired
    private DocumentService documentService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Department getDepartmentId(String departmentName, String division) {
        return departmentRepo.findByDepartmentNameAndDivision(departmentName, division);
    }

    public Department getDepartmentById(Long departmentId) {
        return departmentRepo.findByDepartmentId(departmentId);
    }

    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public User updateRoleUser(UserDto userDto, String username) {

        System.out.println("ten" + username);
        System.out.println("role" + userDto.getRoleLevel());
        User user = getUserByUsername(username);
        System.out.println("id :" + user.getUserId());
        user.setRoleLevel(userDto.getRoleLevel());
        return userRepo.save(user);
    }

    public List<?> getAllDocument() {
        return documentService.getAllDocuments();
    }

    public List<UserDto> getAllUser() {
        List<UserDto> userDtos = new ArrayList<>();
        List<User> users = userRepo.findAll();
        for (User user : users) {
            UserDto userDto = new UserDto();
            DepartmentDto departmentDto = new DepartmentDto();
            userDto.setFullName(user.getFullName());
            userDto.setEmail(user.getEmail());
            userDto.setUsername(user.getUsername());
            userDto.setRoleLevel(user.getRoleLevel());
            Department department = getDepartmentById(user.getDepartmentId());
            departmentDto.setDepartmentName(department.getDepartmentName());
            departmentDto.setDescription(department.getDescription());
            departmentDto.setDivision(department.getDivision());
            userDto.setDepartmentDto(departmentDto);
            userDtos.add(userDto);
        }
        return userDtos;
    }

    public User createUser(UserDto userDto) {
        // Tim phong ban theo ten va division duoc gui tu fe ve
        Department department = departmentRepo.findByDepartmentNameAndDivision(
                userDto.getDepartmentDto().getDepartmentName(), userDto.getDepartmentDto().getDivision());
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setDepartmentId(department.getDepartmentId());
        user.setRoleLevel(userDto.getRoleLevel());
        user.setPassword(encoder.encode(userDto.getPassword()).getBytes(StandardCharsets.UTF_8));
        return userRepo.save(user);
    }

}