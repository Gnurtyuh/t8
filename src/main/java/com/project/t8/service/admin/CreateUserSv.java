package com.project.t8.service.admin;

import com.project.t8.dto.UserDto;
import com.project.t8.entity.User;
import com.project.t8.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateUserSv {
    @Autowired
    private UserRepo userRepo;

    public UserDto createuser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFullname(userDto.getFullname());
        user.setEmail(userDto.getEmail());
        user.setDepartmentId(userDto.getDepartmentId());
        user.setRolelevel(userDto.getRoleLevel());

    }
}
