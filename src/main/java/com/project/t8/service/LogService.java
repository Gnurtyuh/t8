package com.project.t8.service;

import com.project.t8.dto.LogDto;
import com.project.t8.entity.Department;
import com.project.t8.entity.Document;
import com.project.t8.entity.Log;
import com.project.t8.entity.User;
import com.project.t8.repository.LogRepo;
import com.project.t8.service.admin.DepartmentService;
import com.project.t8.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LogService {
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private UserService userService;
    @Autowired
    private DocumentService documentService;
    public Log createLog(LogDto logDto) {
        return logRepo.save(dtoMapEntityLog(logDto));
    }
    public Log updateLog(LogDto logDto) {
        return logRepo.save(dtoMapEntityLog(logDto));
    }

    public List<LogDto> findByUserId(Long userId) {
        List<Log> logs = logRepo.findByUserId(userId);
        List<LogDto> logDto = new ArrayList<>();
        for (Log log : logs) {
            logDto.add(entityMapDtoLog(log));
        }
        return logDto;
    }
    public List<LogDto> findByMonth(int month) {
        List<Log> logs = logRepo.findByMonth(month);
        List<LogDto> logDto = new ArrayList<>();
        for (Log log : logs) {
            logDto.add(entityMapDtoLog(log));
        }
        return logDto;
    }
    public List<LogDto> findByDepartmentId(Long departmentId) {
        List<Log> logs = logRepo.findByDepartmentId(departmentId);
        List<LogDto> logDto = new ArrayList<>();
        for (Log log : logs) {
            logDto.add(entityMapDtoLog(log));
        }
        return logDto;
    }
    public LogDto findByLogId(Long logId) {
        return entityMapDtoLog(logRepo.findByLogId(logId));
    }
    LogDto entityMapDtoLog(Log log) {
        Department department = departmentService.getDepartmentById(log.getDepartmentId());
        User user = userService.findByUserId(log.getUserId());
        Document document = documentService.getDocumentById(log.getDocumentId());
        LogDto logDto = new LogDto();
        logDto.setAction(log.getAction());
        logDto.setDescription(log.getDescription());
        logDto.setStatus(log.getStatus());
        logDto.setTarget(log.getTarget());
        logDto.setDepartmentDto(departmentService.entityMapDto(department));
        logDto.setDocumentDto(documentService.dtoMapEntityDoc(document));
        logDto.setCreatedAt(log.getCreatedAt());
        logDto.setCompletedAt(log.getCompletedAt());
        logDto.setUserDto(userService.entityMapDto(user));
        return logDto;
    }
    Log dtoMapEntityLog(LogDto logDto) {
        Log log = new Log();
        Department department = departmentService.getDepartmentById(log.getDepartmentId());
        User user = userService.findByUserId(log.getUserId());
        Document document = documentService.getDocumentById(log.getDocumentId());
        log.setAction(logDto.getAction());
        log.setDescription(logDto.getDescription());
        log.setStatus(logDto.getStatus());
        log.setTarget(logDto.getTarget());
        log.setDepartmentId(department.getDepartmentId());
        log.setDocumentId(document.getDocumentId());
        log.setUserId(user.getUserId());
        return log;
    }
}
