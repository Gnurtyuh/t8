package com.project.t8.controller.admin;

import com.project.t8.dto.UserDto;
import com.project.t8.entity.User;
import com.project.t8.service.admin.CreateUserSv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class CreateUser {
    @Autowired
    public CreateUserSv createUserSv;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        User saveUser = createUserSv.createUser(userDto);
        return ResponseEntity.ok(saveUser);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        List<UserDto> allUser = createUserSv.getAllUser();
        // System.out.println(allUser);
        return ResponseEntity.ok(allUser);

    }

    @PutMapping("/updateRole/{username}")
    public ResponseEntity<?> updateRole(@PathVariable String username, @RequestBody UserDto userDto) {
        User updateRole = createUserSv.updateRoleUser(userDto, username);
        return ResponseEntity.ok(updateRole);
    }

    @GetMapping("/documents")
    public ResponseEntity<?> getAllDocument() {
        List<?> allDocument = createUserSv.getAllDocument();
        return ResponseEntity.ok(allDocument);
    }
}