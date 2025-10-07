package com.project.t8.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.t8.entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin,Long> {

} 
