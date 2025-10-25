package com.project.t8.service;

import com.project.t8.dto.DocumentDto;
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

import java.sql.Timestamp;
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
    public Log createLog(Document document,String action) {
        DocumentDto documentDto = documentService.dtoMapEntityDoc(document);
        LogDto logDto=new LogDto();
        // LogDto.setCompletedAt(null);
        logDto.setUserDto(documentDto.getUserDto());
        logDto.setDepartmentDto(documentDto.getDepartmentDto());
        logDto.setAction(action);
        logDto.setDocumentDto(documentDto);
        logDto.setStatus("PENDING");
        logDto.setTarget(documentDto.getTitle());
        logDto.setDescription(documentDto.getDescription());
        Log log= dtoMapEntityLog(logDto);
        log.setLogId(null);
        log.setCreatedAt(null);
        return logRepo.save(log);
    }
    public Log updateLog(long id,LogDto logDto) {
        Log log = dtoMapEntityLog(findByLogId(id));
        log.setAction(logDto.getAction());
        log.setStatus(logDto.getStatus());
        log.setDescription(logDto.getDescription());
        log.setCompletedAt(new Timestamp(System.currentTimeMillis()));
        return logRepo.save(log);
    }

    public List<LogDto> findByUser(String username) {
        User user=userService.findByUsername(username);
        List<Log> logs = logRepo.findByUserId( Math.toIntExact(user.getUserId()));
        List<LogDto> logDto = new ArrayList<>();
        for (Log log : logs) {
            logDto.add(entityMapDtoLog(log));
        }
        return logDto;
    }
    public List<LogDto> findByMonth(Long userId ,int month) {
        List<Log> logs = logRepo.findByMonth( Math.toIntExact(userId),month);
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
    public List<LogDto> findByDocumentId(Long documentId) {
        List<Log> logs = logRepo.findByDocumentId(documentId);
        List<LogDto> logDto = new ArrayList<>();
        for (Log log : logs) {
            logDto.add(entityMapDtoLog(log));
        }
        return logDto;
    }
    public List<LogDto> findByDepartmentName(String departmentName) {
        List<Department> departments = departmentService.getDepartmentByName(departmentName);
        List<LogDto> logDto = new ArrayList<>();
        for(Department department : departments) {
            List<Log> logs = logRepo.findByDepartmentId(department.getDepartmentId());
            for (Log log : logs) {
                logDto.add(entityMapDtoLog(log));
            }
        }
        return logDto;
    }
    public List<LogDto> getAllLog() {
        List<Log> logs = logRepo.findAll();
        List<LogDto> logDto = new ArrayList<>();
        for (Log log : logs) {
            logDto.add(entityMapDtoLog(log));
        }
        return logDto;
    }
    public LogDto findByLogId(Long logId) {
        return entityMapDtoLog(logRepo.findByLogId(logId));
    }
    public LogDto entityMapDtoLog(Log log) {
        Department department = departmentService.getDepartmentById(log.getDepartmentId());
        User user = userService.findByUserId(log.getUserId());
        Document document = documentService.getDocumentById(log.getDocumentId());
        LogDto logDto = new LogDto();
        logDto.setLogId(log.getLogId());
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
    public Log dtoMapEntityLog(LogDto logDto) {
        Log log = new Log();
        Department department = departmentService.getDepartmentById(logDto.getDepartmentDto().getDepartmentId());
        User user = userService.findByUsername(logDto.getUserDto().getUsername());
        Document document = documentService.getDocumentById(logDto.getDocumentDto().getDocumentId());
        log.setLogId(logDto.getLogId());
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
