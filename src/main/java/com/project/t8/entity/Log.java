package com.project.t8.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.TimerTask;

@Entity
@Table(name = "logs")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "target")
    private String target;

    @Column(name = "document_id")
    private Long documentId;

    @Column(name = "status")
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private Timestamp created_At;

    @Column(name = "completed_at")
    private Timestamp completed_At;

    @Column(name = "department_id")
    private Long department_Id;

    public Log() {

    }

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreated_At() {
        return created_At;
    }


    public Timestamp getCompleted_At() {
        return completed_At;
    }


    public Long getDepartment_Id() {
        return department_Id;
    }

    public void setDepartment_Id(Long department_Id) {
        this.department_Id = department_Id;
    }
}
