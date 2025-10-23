package com.project.t8.dto;

import com.project.t8.entity.Department;
import lombok.Data;

import java.sql.Timestamp;

import java.sql.Timestamp;

@Data
public class LogDto {
    private long logId;
    private String action;
    private String target;
    private String status;
    private String description;
    private DocumentDto documentDto;
    private Timestamp createdAt;
    private Timestamp completedAt;
    private DepartmentDto departmentDto;
    private UserDto userDto;
}
