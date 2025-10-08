package com.project.t8.dto;

import jakarta.persistence.Column;

import java.sql.Timestamp;

public class DocumentDto {
    private String title;
    private String description;
    private Timestamp uploadDate;
    private String filePath;
    private String uploadedByUser;
    private Long departmentId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Timestamp uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getUploadedByUser() {
        return uploadedByUser;
    }

    public void setUploadedByUser(String uploadedByUser) {
        this.uploadedByUser = uploadedByUser;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}
