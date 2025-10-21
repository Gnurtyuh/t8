package com.project.t8.controller.user;

import com.project.t8.service.LogService;
import com.project.t8.util.AesUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/user")
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
}
