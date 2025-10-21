package com.project.t8.controller.user;

import com.project.t8.service.LogService;
import com.project.t8.util.AesUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/user/aes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AesController {

    @PostMapping("/encrypt")
    public ResponseEntity<?> encryptFile(
            @RequestParam String password,
            @RequestParam String filePath) throws Exception {
        File input = new File(filePath);
        String newPath = AesUtil.encrypt(password.toCharArray(), input);
        return ResponseEntity.ok(newPath);
    }
    @PostMapping("/decrypt")
    public ResponseEntity<?> decryptFile(
            @RequestParam String password,
            @RequestParam String filePath) throws Exception {
        File input = new File(filePath);
        String newPath = AesUtil.decrypt(password.toCharArray(), input);
        return ResponseEntity.ok(newPath);
    }
    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam String filePath) {
        File file = new File(filePath);

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ File không tồn tại: " + filePath);
        }

        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestParam String filePath) {
        try {
            Path targetFile = Paths.get(filePath).toAbsolutePath().normalize();

            if (Files.exists(targetFile)) {
                Files.delete(targetFile);
                return ResponseEntity.ok("✅ Đã xóa file: " + targetFile.getFileName());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("⚠️ Không tìm thấy file: " + targetFile);
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Lỗi khi xóa file: " + e.getMessage());
        }
    }


}
