package com.project.t8.controller.admin;

import com.project.t8.dto.LogDto;
import com.project.t8.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;

import java.util.List;

@RestController
@RequestMapping("/admin/log")
public class LogAdminController {
    @Autowired
    private LogService logService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getLogByUser(@PathVariable String username) {
        List<LogDto> logs = logService.findByUser(username);
        Collections.reverse(logs);
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<?> getLogByDepartmentId(@PathVariable long departmentId) {
        List<LogDto> logs = logService.findByDepartmentId(departmentId);
        Collections.reverse(logs);
        return ResponseEntity.ok(logs);
    }

    @GetMapping
    public ResponseEntity<?> getLogByMonth(@RequestParam int month) {
        List<LogDto> logs = logService.findByMonth(null, month);
        Collections.reverse(logs);
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllLog() {
        List<LogDto> logs = logService.getAllLog();
        Collections.reverse(logs);
        System.out.println(logs);
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/{logId}")
    public ResponseEntity<?> findLogById(@PathVariable long logId) {
        LogDto logs = logService.findByLogId(logId);
        return ResponseEntity.ok(logs);
    }
}
