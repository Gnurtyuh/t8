package com.project.t8.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.t8.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
     Optional<User> findByUsername(String username);
} 
