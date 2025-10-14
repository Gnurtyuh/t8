package com.project.t8.dto;

import jakarta.persistence.Column;
import lombok.Data;


import java.sql.Timestamp;

@Data
public class DocumentDto {
    private String title;
    private String description;
    private Timestamp uploadDate;
    private String filePath;
    private UserDto userDto;
    private DepartmentDto departmentDto;
}
