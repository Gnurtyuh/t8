package com.project.t8.service.admin;

import com.project.t8.dto.UserDto;
import com.project.t8.dto.DepartmentDto;
import com.project.t8.entity.Admin;
import com.project.t8.entity.Department;
import com.project.t8.entity.User;
import com.project.t8.repository.AdminRepo;
import com.project.t8.repository.DepartmentRepo;
import com.project.t8.repository.DocumentRepo;
import com.project.t8.repository.UserRepo;
import com.project.t8.service.DocumentService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.lang.StackWalker.Option;
import java.lang.annotation.Documented;
import java.nio.charset.StandardCharsets;

import javax.management.RuntimeErrorException;

@Service
public class CreateUserSv {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private DepartmentRepo departmentRepo;
    @Autowired
    private DocumentService documentService;
    @Autowired
    private AdminRepo adminRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Department getDepartmentId(String departmentName, String division) {
        return departmentRepo.findByDepartmentNameAndDivision(departmentName, division);
    }

    public Department getDepartmentById(Long departmentId) {
        return departmentRepo.findByDepartmentId(departmentId);
    }

    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public User updateRoleUser(UserDto userDto, String username) {
        User user = getUserByUsername(username);
        user.setRoleLevel(userDto.getRoleLevel());
        return userRepo.save(user);
    }

    public User updateDepartment(String username, String first, String second) {
        User user = getUserByUsername(username);
        Department department = getDepartmentId(first, second);
        if (department == null) {
            // Nếu không tìm thấy thì thử ngược lại
            department = getDepartmentId(second, first);
        }

        if (department == null) {
            throw new IllegalArgumentException("Không tìm thấy phòng ban phù hợp với: " + first + " - " + second);
        }
        user.setDepartmentId(department.getDepartmentId());
        return userRepo.save(user);
    }

    public List<?> getAllDocument() {
        return documentService.getAllDocuments();
    }

    public List<UserDto> getAllUser() {
        List<UserDto> userDtos = new ArrayList<>();
        List<User> users = userRepo.findAll();
        for (User user : users) {
            UserDto userDto = new UserDto();
            DepartmentDto departmentDto = new DepartmentDto();
            userDto.setFullName(user.getFullName());
            userDto.setEmail(user.getEmail());
            userDto.setUsername(user.getUsername());
            userDto.setRoleLevel(user.getRoleLevel());
            Department department = getDepartmentById(user.getDepartmentId());
            departmentDto.setDepartmentName(department.getDepartmentName());
            departmentDto.setDescription(department.getDescription());
            departmentDto.setDivision(department.getDivision());
            userDto.setDepartmentDto(departmentDto);
            userDtos.add(userDto);
        }
        return userDtos;
    }

    public User createUser(UserDto userDto) {
        // Tim phong ban theo ten va division duoc gui tu fe ve
        Department department = departmentRepo.findByDepartmentNameAndDivision(
                userDto.getDepartmentDto().getDepartmentName(), userDto.getDepartmentDto().getDivision());
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setDepartmentId(department.getDepartmentId());
        user.setRoleLevel(userDto.getRoleLevel());
        user.setPassword(encoder.encode(userDto.getPassword()).getBytes(StandardCharsets.UTF_8));
        return userRepo.save(user);
    }

    public boolean login(String username, String inputPassword) {

        System.out.println("📥 [LOGIN] Username nhận được: " + username);
        System.out.println("📥 [LOGIN] Password nhập vào: " + inputPassword);
        Optional<Admin> adminOpt = adminRepo.findByUsername(username);
        if (adminOpt.isEmpty()) {
            System.out.println("❌ Không tìm thấy admin có username: " + username);
            return false;
        }
        Admin admin = adminOpt.get();
        String storedPassword = admin.getPassword();

        String decoded = decodeHexIfNeeded(storedPassword);
        boolean match = false;

        if (decoded != null) {
            match = inputPassword.equals(decoded);
            System.out.println("✅ [HEX] Giải mã ra: " + decoded + " → Kết quả so sánh: " + match);
        }

        return match;
    }

    private String decodeHexIfNeeded(String s) {
        if (s == null)
            return null;

        String str = s.trim();
        // Trường hợp \x313233 hoặc \\x313233
        if (str.contains("\\x") || str.startsWith("\\x")) {
            String cleaned = str.replaceAll("\\\\x", ""); // xóa "\x"
            if (cleaned.matches("^[0-9A-Fa-f]+$") && cleaned.length() % 2 == 0) {
                return hexToString(cleaned);
            }
            return null;
        }

        // Trường hợp chỉ toàn ký tự hex: "313233"
        if (str.matches("^[0-9A-Fa-f]+$") && str.length() % 2 == 0) {
            return hexToString(str);
        }

        return null;
    }

    private String hexToString(String hex) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < hex.length(); i += 2) {
            String byteStr = hex.substring(i, i + 2);
            sb.append((char) Integer.parseInt(byteStr, 16));
        }
        return sb.toString();
    }
}