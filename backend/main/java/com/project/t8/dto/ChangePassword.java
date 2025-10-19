package com.project.t8.dto;

import lombok.Data;

@Data
public class ChangePassword {
    private String currentPassword;
    private String newPassword;

}
