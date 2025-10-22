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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            @RequestParam("password") String password,
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails user) throws Exception {

        //  Tạo file tạm trên server
        File tempFile = File.createTempFile("upload_", "_" + file.getOriginalFilename());
        file.transferTo(tempFile);

        try {
            String encryptedPath = AesUtil.encrypt(password.toCharArray(), tempFile);

            Files.deleteIfExists(tempFile.toPath());

            return ResponseEntity.ok(Map.of(
                    "message", "File encrypted successfully",
                    "path", encryptedPath
            ));
        } catch (Exception e) {
            System.out.println("loi tu day");
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/decrypt")
    public ResponseEntity<byte[]> decryptFile(
            @RequestParam("password") String password,
            @RequestParam("filename") String filename) throws Exception {

        // Giải mã file (hàm decrypt sẽ tạo file giải mã trên server)
        String decryptedPath = AesUtil.decrypt(password.toCharArray(), filename);

        //  Đọc file giải mã vào bộ nhớ
        File decryptedFile = new File(decryptedPath);
        byte[] decryptedBytes = Files.readAllBytes(decryptedFile.toPath());

        // Trả file giải mã về client để tải xuống
        ResponseEntity<byte[]> response = ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + decryptedFile.getName() + "\"")
                .body(decryptedBytes);

        //Dọn dẹp: xóa file giải mã sau khi trả về (nếu bạn muốn)
        Files.deleteIfExists(decryptedFile.toPath());

        return response;
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


}
