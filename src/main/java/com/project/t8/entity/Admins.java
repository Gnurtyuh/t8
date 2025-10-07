package com.project.t8.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admins {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

}
