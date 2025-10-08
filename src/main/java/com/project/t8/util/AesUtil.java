package com.project.t8.util;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Random;

public class AesUtil {
    public static String salt ="TrungTanThinhCuong";
    public static SecretKey generateAesKey(char[] password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] saltBytes = salt.getBytes();
        SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2withHmacSHA256");
        KeySpec spec = new PBEKeySpec(password, saltBytes, 65536, 256);
        byte[] key = secretKeyFactory.generateSecret(spec).getEncoded();
        return new SecretKeySpec(key, "AES");
    }
    public static void encrypt(char[] password, File input,File output) throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, InvalidKeyException, IOException {
        byte[] iv = new byte[16];
        SecretKey secretKey = generateAesKey(password);
        Cipher cipher = Cipher.getInstance("AES/GCM/PKCS5Padding");
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(128, iv);
        cipher.init(Cipher.ENCRYPT_MODE,secretKey,gcmParameterSpec);
        try (FileInputStream fileInputStream = new FileInputStream(input);
            FileOutputStream fileOutputStream = new FileOutputStream(output);
            CipherOutputStream cipherOutputStream = new CipherOutputStream(fileOutputStream, cipher)) {

            fileOutputStream.write(iv);
            byte[] buffer = new byte[4096];
            int n;
            while ((n = fileInputStream.read(buffer)) != -1) {
                cipherOutputStream.write(buffer, 0, n);
            }
        }finally {
            Arrays.fill(password, '\0');
        }
    }
    public static void decrypt(char[] password, File input, File output) throws Exception {
        try (FileInputStream fis = new FileInputStream(input)) {
            byte[] iv = new byte[16];
            if (fis.read(iv) != 16) {
                throw new IllegalArgumentException("File too short or missing iv");
            }

            SecretKey key = generateAesKey(password);
            Cipher cipher = Cipher.getInstance("AES/GCM/PKCS5Padding");
            GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv);
            cipher.init(Cipher.DECRYPT_MODE, key, gcmSpec);

            try (CipherInputStream cis = new CipherInputStream(fis, cipher);
                 FileOutputStream fos = new FileOutputStream(output)) {
                byte[] buffer = new byte[4096];
                int n;
                while ((n = cis.read(buffer)) != -1) {
                    fos.write(buffer, 0, n);
                }
            } finally {
                Arrays.fill(password, '\0');
            }
        }
    }
}
