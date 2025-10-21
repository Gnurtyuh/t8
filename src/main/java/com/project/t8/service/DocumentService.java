package com.project.t8.service;

import com.project.t8.dto.DocumentDto;
import com.project.t8.dto.LogDto;
import com.project.t8.entity.Department;
import com.project.t8.entity.Document;
import com.project.t8.entity.User;
import com.project.t8.repository.DepartmentRepo;
import com.project.t8.repository.DocumentRepo;
import com.project.t8.repository.UserRepo;
import com.project.t8.service.admin.DepartmentService;
import com.project.t8.service.user.UserService;
import com.project.t8.util.AesUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.NoSuchPaddingException;
import java.io.File;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepo documentRepo;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private UserService userService;

    public Document createDocument(DocumentDto documentDto) {
        return documentRepo.save(entityMapDtoDoc(documentDto));
    }

    public Document updateDocument(long id, DocumentDto documentDto) {
        Document document = getDocumentById(id);
        document.setTitle(documentDto.getTitle());
        document.setDescription(documentDto.getDescription());
        document.setFilePath(documentDto.getFilePath());
        return documentRepo.save(document);
    }
    public List<DocumentDto> findByDepartmentId(Long departmentId) {
        List<Document> documents = documentRepo.findByDepartmentId(departmentId);
        List<DocumentDto> documentsDto = new ArrayList<>();
        for (Document document : documents) {
            documentsDto.add(dtoMapEntityDoc(document));
        }
        return documentsDto;
    }
    public List<DocumentDto> findByDepartmentName(String departmentName) {
        List<Department> departments = departmentService.getDepartmentByName(departmentName);
        List<DocumentDto> documentsDto = new ArrayList<>();
        for(Department department : departments) {
            List<Document> documents = documentRepo.findByDepartmentId(department.getDepartmentId());
            for (Document document : documents) {
                documentsDto.add(dtoMapEntityDoc(document));
            }
        }
        return documentsDto;
    }
    public Document getDocumentById(long id) {
        return documentRepo.findById(id).orElseThrow(()->new EntityNotFoundException("Document not found"));
    }
    public List<DocumentDto> findByUser(String username) {
        User user = userService.findByUsername(username);
        Long userId = user.getUserId();
        List<Document> documents = documentRepo.findByUser(userId);
        List<DocumentDto> documentsDto = new ArrayList<>();
        for (Document document : documents) {
            documentsDto.add(dtoMapEntityDoc(document));
        }
        return documentsDto;
    }
    public List<DocumentDto> getAllDocuments() {
        List<Document> documents = documentRepo.findAll();
        List<DocumentDto> documentsDto = new ArrayList<>();
        for (Document document : documents) {
            documentsDto.add(dtoMapEntityDoc(document));
        }
        return documentsDto;
    }
    public void deleteDocument(Long documentId) {
        documentRepo.deleteById(documentId);
    }
    public Document entityMapDtoDoc(DocumentDto documentDto) {
        Document document = new Document();
        Department department = departmentService.dtoMapEntity(documentDto.getDepartmentDto());
        User user = userService.dtoMapEntity(documentDto.getUserDto());
        document.setTitle(documentDto.getTitle());
        document.setDescription(documentDto.getDescription());
        document.setDepartmentId(department.getDepartmentId());
        document.setFilePath(documentDto.getFilePath());
        document.setUploadedByUser(user.getUserId());
        return document;
    }
    public DocumentDto dtoMapEntityDoc(Document doc) {
        DocumentDto document = new DocumentDto();
        Department department = departmentService.getDepartmentById(doc.getDepartmentId());
        User user = userService.findByUserId(doc.getUploadedByUser());
        document.setTitle(doc.getTitle());
        document.setDescription(doc.getDescription());
        document.setDepartmentDto(departmentService.entityMapDto(department));
        document.setFilePath(doc.getFilePath());
        document.setUserDto(userService.entityMapDto(user));
        document.setUploadDate(doc.getUploadDate());
        return document;
    }

}
