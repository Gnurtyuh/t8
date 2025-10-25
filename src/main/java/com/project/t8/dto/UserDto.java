package com.project.t8.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String password;
    private String email;
    private String fullName;
    private Short roleLevel;
    private DepartmentDto departmentDto;
}