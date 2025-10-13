package com.project.t8.controller.admin;

import com.project.t8.repository.DocumentRepo;
import com.project.t8.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/document")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

}
