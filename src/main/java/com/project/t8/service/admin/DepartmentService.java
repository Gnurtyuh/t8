package com.project.t8.service.admin;

import com.project.t8.dto.DepartmentDto;
import com.project.t8.entity.Department;
import com.project.t8.repository.DepartmentRepo;
import com.project.t8.repository.DocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepo departmentRepo;
    public void createDepartment(DepartmentDto departmentdto) {
        Department department = new Department();
        department.setDepartmentName(departmentdto.getDepartmentName());
        department.setDivision(departmentdto.getDivision());
        department.setDescription(departmentdto.getDescription());
        departmentRepo.save(department);
    }
    public void updateDepartment(DepartmentDto departmentdto) {
        Department department = new Department();
        department.setDepartmentName(departmentdto.getDepartmentName());
        department.setDivision(departmentdto.getDivision());
        department.setDescription(departmentdto.getDescription());
        departmentRepo.save(department);
    }
    public void deleteDepartment(Department department) {
        departmentRepo.delete(department);
    }
    public List<DepartmentDto> getAllDepartments() {
        List<DepartmentDto> departmentDtos = new ArrayList<>();
        List<Department> departments = departmentRepo.findAll();
        for (Department department : departments) {
            DepartmentDto dto = new DepartmentDto();
            dto.setDepartmentName(department.getDepartmentName());
            dto.setDivision(department.getDivision());
            dto.setDescription(department.getDescription());
            departmentDtos.add(dto);
        }
        return departmentDtos;
    }
}
