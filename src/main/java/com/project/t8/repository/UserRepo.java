package com.project.t8.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.t8.entity.User;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
     Optional<User> findByUsername(String username);

     List<User> findByEmail(String email);
}
