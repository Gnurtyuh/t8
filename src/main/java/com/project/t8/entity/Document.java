package com.project.t8.entity;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Long documentId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "upload_date")
    private Timestamp uploadDate;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "uploaded_by_user")
    private Long uploadedByUser;

    @Column(name = "department_id")
    private Long departmentId;

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

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

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Long getUploadedByUser() {
        return uploadedByUser;
    }

    public void setUploadedByUser(Long uploadedByUser) {
        this.uploadedByUser = uploadedByUser;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}
