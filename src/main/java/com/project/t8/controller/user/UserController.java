package com.project.t8.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.t8.entity.User;
import com.project.t8.repository.UserRepo;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserRepo userrp;
    

    @GetMapping("/userinfor")
    private List<User> getUsers(){
        return userrp.findAll();
    }

}
