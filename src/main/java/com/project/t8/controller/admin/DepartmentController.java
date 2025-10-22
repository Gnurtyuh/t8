package com.project.t8.controller.admin;

import java.util.List;

import com.project.t8.dto.DepartmentDto;
import com.project.t8.service.admin.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.t8.entity.Department;

@RestController
@RequestMapping("/admin/department")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/AllDepartment")
    public ResponseEntity<List<DepartmentDto>> getAllDepartment() {
        List<DepartmentDto> departmentDto = departmentService.getAllDepartments();
        if (departmentDto.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(departmentDto);
    }

    @PostMapping
    public ResponseEntity<Department> saveDepartment(@RequestBody DepartmentDto departmentDto) {
        Department department = departmentService.createDepartment(departmentDto);
        if (department == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(department);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@RequestBody DepartmentDto departmentDto,
            @PathVariable long id) {
        Department department = departmentService.updateDepartment(departmentDto, id);
        if (department == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(department);
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<?> getDepartment(@PathVariable long departmentId) {
        Department department = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentService.entityMapDto(department));
    }

}
