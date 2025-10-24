package com.project.t8.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.t8.entity.Department;

import java.util.List;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Long> {
    @Query("SELECT d FROM Department d WHERE d.departmentName = :departmentName")
    List<Department> findByDepartmentName(@Param("departmentName") String departmentName);

    Department findByDepartmentNameAndDivision(String departmentName, String division);

    Department findByDepartmentId(Long departmentId);
}