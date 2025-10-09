package com.project.t8.service;

import com.project.t8.dto.DocumentDto;
import com.project.t8.entity.Document;
import com.project.t8.repository.DocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepo documentRepo;
    public Document createDocument(DocumentDto documentDto) {
        return documentRepo.save(entityMapDtoDoc(documentDto));
    }
    public Document updateDocument(DocumentDto documentDto) {
        return documentRepo.save(entityMapDtoDoc(documentDto));
    }
    public List<DocumentDto> findByDepartmentId(Long departmentId) {
        List<Document> documents = documentRepo.findByDepartmentId(departmentId);
        List<DocumentDto> documentsDto = new ArrayList<>();
        for (Document document : documents) {
            documentsDto.add(DtoMapEntityDoc(document));
        }
        return documentsDto;
    }
    public List<DocumentDto> findByUser(Long username) {
        List<Document> documents = documentRepo.findByUser(username);
        List<DocumentDto> documentsDto = new ArrayList<>();
        for (Document document : documents) {
            documentsDto.add(DtoMapEntityDoc(document));
        }
        return documentsDto;
    }
    public List<DocumentDto> getAllDocuments() {
        List<Document> documents = documentRepo.findAll();
        List<DocumentDto> documentsDto = new ArrayList<>();
        for (Document document : documents) {
            documentsDto.add(DtoMapEntityDoc(document));
        }
        return documentsDto;
    }
    public void deleteDocument(Long documentId) {
        documentRepo.deleteById(documentId);
    }
    public Document entityMapDtoDoc(DocumentDto documentDto) {
        Document document = new Document();
        document.setTitle(documentDto.getTitle());
        document.setDescription(documentDto.getDescription());
        document.setDepartmentId(documentDto.getDepartmentId());
        document.setFilePath(documentDto.getFilePath());
        document.setUploadedByUser(documentDto.getUploadedByUser());
        return document;
    }
    public DocumentDto DtoMapEntityDoc(Document doc) {
        DocumentDto document = new DocumentDto();
        document.setTitle(doc.getTitle());
        document.setDescription(doc.getDescription());
        document.setDepartmentId(doc.getDepartmentId());
        document.setFilePath(doc.getFilePath());
        document.setUploadedByUser(doc.getUploadedByUser());
        return document;
    }

}
