package com.project.t8.service.user;

import com.project.t8.dto.DepartmentDto;
import com.project.t8.dto.UserDto;
import com.project.t8.entity.Department;
import com.project.t8.entity.User;
import com.project.t8.repository.DepartmentRepo;
import com.project.t8.repository.UserRepo;
import com.project.t8.service.admin.DepartmentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private DepartmentService departmentService;

    public User updateUser(UserDto userDto) {
        return userRepo.save(dtoMapEntity(userDto));
    }
    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }
    public User findByUserId(long userId) {
        return userRepo.findById(userId).orElseThrow(()->new EntityNotFoundException("User not found"));
    }
    public UserDto entityMapDto(User user){
        UserDto userDto = new UserDto();
        Department department = departmentService.getDepartmentById(user.getDepartmentId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setDepartmentDto(departmentService.entityMapDto(department));
        userDto.setFullName(user.getFullName());
        userDto.setRoleLevel(user.getRoleLevel());
        return userDto;
    }
    public User dtoMapEntity(UserDto userDto){
        User user = new User();
        DepartmentDto departmentDto = userDto.getDepartmentDto();
        user.setDepartmentId(departmentService.dtoMapEntity(departmentDto).getDepartmentId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setFullName(userDto.getFullName());
        user.setRoleLevel(userDto.getRoleLevel());
        return user;
    }
}
