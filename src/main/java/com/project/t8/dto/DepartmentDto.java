package com.project.t8.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class DepartmentDto {
    private String departmentName;
    private String division;
    private String description;

}
