package com.project.t8.repository;

import com.project.t8.dto.DocumentDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.t8.entity.Document;

import java.util.List;

@Repository
public interface DocumentRepo extends JpaRepository<Document,Long>{
    List<Document> findByDepartmentId(Long departmentId);
    @Query("SELECT d FROM Document d WHERE d.uploadedByUser = :uploadedByUser")
    List<Document> findByUser(@Param("uploadedByUser") String uploadedByUser);

} 
