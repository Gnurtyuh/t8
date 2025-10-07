package com.project.t8.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.t8.entity.Department;
import com.project.t8.repository.DepartmentRepo;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/user")
public class DepartmentController {
    
    @Autowired
    private DepartmentRepo departmentRepo;

    @GetMapping("/department")
    public List<Department> getDepartments(){
        return departmentRepo.findAll();
    }
}
