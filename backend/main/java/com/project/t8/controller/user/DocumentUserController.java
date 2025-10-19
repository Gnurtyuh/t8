package com.project.t8.controller.user;

import com.project.t8.dto.DocumentDto;
import com.project.t8.dto.LogDto;
import com.project.t8.entity.Document;
import com.project.t8.service.DocumentService;
import com.project.t8.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/document")
public class DocumentUserController {
    @Autowired
    private DocumentService documentService;
    @Autowired
    private LogService logService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getDocument(@PathVariable long id) {
        Document document= documentService.getDocumentById(id);
        return ResponseEntity.ok(documentService.dtoMapEntityDoc(document));
    }
    @PostMapping
    public ResponseEntity<?> createDocument(@RequestBody DocumentDto documentDto) {
        Document document= documentService.createDocument(documentDto);
        logService.createLog(documentDto,"CREATED");
        return ResponseEntity.ok(documentService.dtoMapEntityDoc(document));
    }
    @PreAuthorize("authentication.principal.roleLevel <= 2")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocument(@PathVariable long id, @RequestBody DocumentDto documentDto ) {
        Document document= documentService.updateDocument(id,documentDto);
        logService.createLog(documentDto,"UPDATED");
        return ResponseEntity.ok(documentService.dtoMapEntityDoc(document));
    }
    @PreAuthorize("authentication.principal.roleLevel <= 2")
    @GetMapping("/departmentId")
    public ResponseEntity<?> getDocumentByDepartmentId(@RequestParam long departmentId) {
        List<DocumentDto> documentDto= documentService.findByDepartmentId(departmentId);
        return ResponseEntity.ok(documentDto);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 1")
    @GetMapping
    public ResponseEntity<?> getDocumentByDepartmentName(@RequestParam String departmentName) {
        List<DocumentDto> documentDto= documentService.findByDepartmentName(departmentName);
        return ResponseEntity.ok(documentDto);
    }
    @PreAuthorize("authentication.principal.roleLevel <= 3")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getDocumentByUser(@PathVariable Long  userId) {
        List<DocumentDto> documentDto= documentService.findByUser(userId);
        return ResponseEntity.ok(documentDto);
    }
}
