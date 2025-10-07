package com.project.t8.dto;

public class UserDto {
    private String username;
    private byte[] password;
    private String email;
    private String fullName;
    private Short roleLevel;
    private Long departmentId;

    public void setUsername(String username) {
        this.username = username;
    }
    public String getUsername() {
        return username;
    }

    public void setPassword(byte[] password) {
        this.password = password;
    }
    public byte[] getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    public void setFullName(String FullName) {
        this.fullName = FullName;
    }
    public String getFullname() {
        return fullName;
    }

    public void setRoleLevel(Short roleLevel) {
        this.roleLevel = roleLevel;
    }
    public Short getRoleLevel() {
        return roleLevel;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
    public Long getDepartmentId() {
        return departmentId;
    }
}
