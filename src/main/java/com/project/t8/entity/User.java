package com.project.t8.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password",nullable = false,columnDefinition = "BYTEA")
    private byte[] password;

    @Column(name = "email")
    private String email;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "role_level", columnDefinition = "SMALLINT",nullable = false)
    private Short roleLevel;

    @Column(name = "department_id")
    private Long departmentId;

    public User() {

    }
}
