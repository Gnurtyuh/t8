package com.project.t8.controller.admin;

import com.project.t8.dto.DocumentDto;
import com.project.t8.entity.Document;
import com.project.t8.repository.DocumentRepo;
import com.project.t8.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("authentication.principal.roleLevel = 0")
@RestController
@RequestMapping("/admin/document")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllDocument() {
        List<DocumentDto> documentDtos = documentService.getAllDocuments();
        return ResponseEntity.ok(documentDtos);
    }

    @GetMapping("/document/{id}")
    public ResponseEntity<?> getDocument(@PathVariable long id) {
        Document document = documentService.getDocumentById(id);
        return ResponseEntity.ok(documentService.dtoMapEntityDoc(document));
    }

    @GetMapping("/departmentId")
    public ResponseEntity<?> getDocumentByDepartmentId(@RequestParam long departmentId) {
        List<DocumentDto> documentDto = documentService.findByDepartmentId(departmentId);
        return ResponseEntity.ok(documentDto);
    }

    @GetMapping
    public ResponseEntity<?> getDocumentByDepartmentName(@RequestParam String departmentName) {
        List<DocumentDto> documentDto = documentService.findByDepartmentName(departmentName);
        return ResponseEntity.ok(documentDto);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getDocumentByUser(@PathVariable String  username) {
        List<DocumentDto> documentDto = documentService.findByUser(username);
        return ResponseEntity.ok(documentDto);
    }
}
