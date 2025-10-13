package com.project.t8.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
@Data
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


}
