package com.project.t8.controller.user;

import com.project.t8.dto.DocumentDto;
import com.project.t8.entity.Department;
import com.project.t8.entity.Document;
import com.project.t8.service.DocumentService;
import com.project.t8.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/document")
public class DocumentController {
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

        return ResponseEntity.ok(documentService.dtoMapEntityDoc(document));
    }


}
