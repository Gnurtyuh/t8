package com.project.t8.controller.admin;

import com.project.t8.dto.UserDto;
import com.project.t8.service.admin.CreateUserSv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class CreateUser {
    @Autowired
    public CreateUserSv createUserSv;
    @PostMapping("/create")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto saveUser = createUserSv.createuser(userDto);
        return ResponseEntity.ok(saveUser);
    }
}