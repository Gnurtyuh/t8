package com.project.t8.service.admin;

import com.project.t8.dto.DepartmentDto;
import com.project.t8.entity.Department;
import com.project.t8.repository.DepartmentRepo;
import com.project.t8.repository.DocumentRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepo departmentRepo;

    public Department createDepartment(DepartmentDto departmentdto) {
        Department department = dtoMapEntity(departmentdto);
        department.setDepartmentId(null);
        return departmentRepo.save(department);
    }

    public Department getDepartmentById(long departmentId) {
        return departmentRepo.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
    }

    public Department updateDepartment(DepartmentDto departmentdto, long id) {
        Department department = getDepartmentById(id);
        if (department == null) {
            return null;
        }
        department.setDepartmentName(departmentdto.getDepartmentName());
        department.setDivision(departmentdto.getDivision());
        department.setDescription(departmentdto.getDescription());
        return departmentRepo.save(department);
    }

    public List<Department> getDepartmentByName(String departmentName) {
        return departmentRepo.findByDepartmentName(departmentName);
    }

    public void deleteDepartment(Department department) {
        departmentRepo.delete(department);
    }

    public List<DepartmentDto> getAllDepartments() {
        List<DepartmentDto> departmentDtos = new ArrayList<>();
        List<Department> departments = departmentRepo.findAll();
        for (Department department : departments) {
            departmentDtos.add(entityMapDto(department));
        }
        return departmentDtos;
    }

    public Department getDepartmentId(String departmentName, String division) {
        return departmentRepo.findByDepartmentNameAndDivision(departmentName, division);
    }
    

    public Department dtoMapEntity(DepartmentDto departmentDto) {
        Department department = new Department();

        Long departmentId = getDepartmentId(departmentDto.getDepartmentName(), departmentDto.getDivision()).getDepartmentId();
        department.setDepartmentId(departmentId);
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDivision(departmentDto.getDivision());
        department.setDescription(departmentDto.getDescription());
        return department;
    }

    public DepartmentDto entityMapDto(Department department) {
        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setDepartmentId(department.getDepartmentId());
        departmentDto.setDepartmentName(department.getDepartmentName());
        departmentDto.setDivision(department.getDivision());
        departmentDto.setDescription(department.getDescription());
        return departmentDto;
    }
}
