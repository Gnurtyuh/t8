package com.project.t8.service;

import com.project.t8.dto.LogDto;
import com.project.t8.entity.Log;
import com.project.t8.repository.LogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LogService {
    @Autowired
    private LogRepo logRepo;
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
        LogDto logDto = new LogDto();
        logDto.setAction(log.getAction());
        logDto.setDescription(log.getDescription());
        logDto.setStatus(log.getStatus());
        logDto.setTarget(log.getTarget());
        logDto.setDepartmentId(log.getDepartmentId());
        logDto.setDocumentId(log.getDocumentId());
        logDto.setCreatedAt(log.getCreatedAt());
        logDto.setCompletedAt(log.getCompletedAt());
        logDto.setUserId(log.getUserId());
        return logDto;
    }
    Log dtoMapEntityLog(LogDto logDto) {
        Log log = new Log();
        log.setAction(logDto.getAction());
        log.setDescription(logDto.getDescription());
        log.setStatus(logDto.getStatus());
        log.setTarget(logDto.getTarget());
        log.setDepartmentId(logDto.getDepartmentId());
        log.setDocumentId(logDto.getDocumentId());
        log.setUserId(logDto.getUserId());
        return log;
    }
}
