package com.project.t8.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.t8.dto.ChangePassword;
import com.project.t8.entity.User;
import com.project.t8.service.user.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("{username}")
    public ResponseEntity<?> getUserInfor(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(userService.entityMapDto(user));
    }

    @PostMapping("/change-password/{userid}")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword, @PathVariable Long userid
    // @RequestHeader("Authorization") String authHeader
    ) {
        try {
            userService.ChangePassword(userid, changePassword.getCurrentPassword(), changePassword.getNewPassword());
            return ResponseEntity.ok("Đổi mật khẩu thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/test")
public ResponseEntity<String> testToken(Authentication authentication) {
    return ResponseEntity.ok("Token hợp lệ, user = " + authentication.getName());
}
}
