package com.project.t8.controller.user;

import com.project.t8.dto.LogDto;
import com.project.t8.entity.Log;
import com.project.t8.service.DocumentService;
import com.project.t8.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/log")
public class LogUserController {
    @Autowired
    private LogService logService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getLog(@PathVariable long id) {
        LogDto logDto = logService.findByLogId(id);
        return ResponseEntity.ok(logDto);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLog( @PathVariable long id, @RequestBody LogDto logDto) {
        Log log = logService.updateLog(id,logDto);
        return ResponseEntity.ok(log);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 3")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getLogByUserId(@PathVariable long userId) {
        List<LogDto> logs = logService.findByUserId(userId);
        return ResponseEntity.ok(logs);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 2")
    @GetMapping("/{departmentId}")
    public ResponseEntity<?> getLogByDepartmentId(@PathVariable long departmentId) {
        List<LogDto> logs = logService.findByDepartmentId(departmentId);
        return ResponseEntity.ok(logs);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 3")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getLogByMonth(@PathVariable Long userId,@RequestParam int month) {
        List<LogDto> logs = logService.findByMonth(userId,month);
        return ResponseEntity.ok(logs);
    }
    @GetMapping("/{logId}")
    public ResponseEntity<?> findLogById(@PathVariable long logId) {
        LogDto logs = logService.findByLogId(logId);
        return ResponseEntity.ok(logs);
    }
}
