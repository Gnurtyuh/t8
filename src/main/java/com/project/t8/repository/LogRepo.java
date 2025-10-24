package com.project.t8.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.t8.entity.Log;

import java.util.List;

@Repository
public interface LogRepo extends JpaRepository<Log,Long>{
    @Query(value = "select d from Log d where d.userId = :userId")
    List<Log> findByUserId(@Param("userId") int userId);
    @Query("SELECT l FROM Log l WHERE (:userId IS NULL OR l.userId = :userId) and FUNCTION('MONTH', l.createdAt) = :month")
    List<Log> findByMonth(@Param("userId") int userId,@Param("month") int month);
    List<Log> findByDepartmentId(Long departmentId);
    Log findByLogId(Long logId);
    List<Log> findByDocumentId(Long documentId);
}
