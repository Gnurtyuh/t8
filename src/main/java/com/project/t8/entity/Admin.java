package com.project.t8.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "username",nullable = false)
    private String userName;

    @Column(name = "password", nullable = false,columnDefinition = "BYTEA")
    private byte[] passWord;

    @Column(name = "email")
    private String email;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "role_level", columnDefinition = "SMALLINT", nullable = false)
    private Short roleLevel;

    public Admin() {

    }


}
