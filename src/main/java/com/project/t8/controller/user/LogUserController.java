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

    @GetMapping("/{logId}")
    public ResponseEntity<?> getLog(@PathVariable long logId) {
        LogDto logDto = logService.findByLogId(logId);
        return ResponseEntity.ok(logDto);
    }

    @PutMapping("/update/{logId}")
    public ResponseEntity<?> updateLog(@PathVariable long logId, @RequestBody LogDto logDto) {
        Log log = logService.updateLog(logId, logDto);
        return ResponseEntity.ok(log);
    }

    @PreAuthorize("authentication.principal.roleLevel <= 3")
    @GetMapping("/userid/{username}")
    public ResponseEntity<?> getLogByUserId(@PathVariable String username) {
        List<LogDto> logs = logService.findByUser(username);
        return ResponseEntity.ok(logs);
    }

    @PreAuthorize("authentication.principal.roleLevel <= 2")
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<?> getLogByDepartmentId(@PathVariable long departmentId) {
        List<LogDto> logs = logService.findByDepartmentId(departmentId);
        return ResponseEntity.ok(logs);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 2")
    @GetMapping("/document/{documentId}")
    public ResponseEntity<?> getLogByDocumentId(@PathVariable long documentId) {
        List<LogDto> logs = logService.findByDocumentId(documentId);
        return ResponseEntity.ok(logs);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 1")
    @GetMapping("/departments/{departmentName}")
    public ResponseEntity<?> getLogByDepartmentName(@PathVariable String departmentName) {
        List<LogDto> logs = logService.findByDepartmentName(departmentName);
        return ResponseEntity.ok(logs);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 3")
    @GetMapping("/userbymonth/{userId}")
    public ResponseEntity<?> getLogByMonth(@PathVariable Long userId, @RequestParam int month) {
        List<LogDto> logs = logService.findByMonth(userId, month);
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/logid/{logId}")
    public ResponseEntity<?> findLogById(@PathVariable long logId) {
        LogDto logs = logService.findByLogId(logId);
        return ResponseEntity.ok(logs);
    }
}
