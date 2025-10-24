package com.project.t8.util;

import org.springframework.stereotype.Component;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Random;

@Component
public class AesUtil {
    public static String salt ="TrungTanThinhCuong";
    
    // Tạo khóa AES từ mật khẩu
    public static SecretKey generateAesKey(char[] password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] saltBytes = salt.getBytes();
        SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2withHmacSHA256");
        KeySpec spec = new PBEKeySpec(password, saltBytes, 65536, 256);
        byte[] key = secretKeyFactory.generateSecret(spec).getEncoded();
        return new SecretKeySpec(key, "AES");
    }

    //mã hóa
    public static String encrypt(char[] password, File input) throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, InvalidKeyException, IOException {
        byte[] iv = new byte[16];
        String extension = getFileExtension(input);
        File folder = new File("path");
        if (!folder.exists() || !folder.isDirectory()) {
            folder.mkdirs(); // chỉ tạo nếu chưa tồn tại
        }
        String path ="path\\"+ renameFile(input) +".enc";
        SecretKey secretKey = generateAesKey(password);
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(128, iv);
        cipher.init(Cipher.ENCRYPT_MODE,secretKey,gcmParameterSpec);
        try (FileInputStream fileInputStream = new FileInputStream(input);
            FileOutputStream fileOutputStream = new FileOutputStream(path);
            CipherOutputStream cipherOutputStream = new CipherOutputStream(fileOutputStream, cipher)) {
            byte[] extBytes = extension.getBytes(StandardCharsets.UTF_8);
            fileOutputStream.write(extBytes.length);   // 1 byte lưu độ dài phần mở rộng
            fileOutputStream.write(extBytes);
            fileOutputStream.write(iv);
            byte[] buffer = new byte[4096];
            int n;
            while ((n = fileInputStream.read(buffer)) != -1) {
                cipherOutputStream.write(buffer, 0, n);
            }
            return path;
        }finally {
            Arrays.fill(password, '\0');
        }
    }
    static String renameFile(File input){
        String fileName = input.getName();
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }
    static String rename(String fileName){
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }

    // Lấy phần mở rộng của tập tin
    public static String getFileExtension(File file) {
        String name = file.getName();
        int lastIndex = name.lastIndexOf('.');
        if (lastIndex == -1 || lastIndex == name.length() - 1) {
            return ""; // Không có phần mở rộng
        }
        return name.substring(lastIndex); // Bao gồm dấu chấm, ví dụ ".pdf"
    }

    public static String decrypt(char[] password, String filename) throws Exception {
        Path encryptedPath = Paths.get("path\\" + rename(filename)+".enc");
        File encryptedFile = encryptedPath.toFile();
        File folder = new File("decrypted");
        if (!folder.exists() || !folder.isDirectory()) {
            folder.mkdirs(); // chỉ tạo nếu chưa tồn tại
        }
        try (FileInputStream fis = new FileInputStream(encryptedFile)) {
            int extLen = fis.read();
            byte[] extBytes = new byte[extLen];
            fis.read(extBytes);
            String extension = new String(extBytes, StandardCharsets.UTF_8);
            byte[] iv = new byte[16];
            if (fis.read(iv) != 16) {
                throw new IllegalArgumentException("File too short or missing iv");
            }
            String output ="decrypted/"+ renameFile(encryptedFile)+extension;
            SecretKey key = generateAesKey(password);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv);
            cipher.init(Cipher.DECRYPT_MODE, key, gcmSpec);

            try (CipherInputStream cis = new CipherInputStream(fis, cipher);
                 FileOutputStream fos = new FileOutputStream(output)) {
                byte[] buffer = new byte[4096];
                int n;
                while ((n = cis.read(buffer)) != -1) {
                    fos.write(buffer, 0, n);
                }
                return output;
            } finally {
                Arrays.fill(password, '\0');
            }
        }
    }
}
