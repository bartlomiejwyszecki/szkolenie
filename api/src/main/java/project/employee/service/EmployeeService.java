package project.employee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.employee.dto.CreateEmployeeDTO;
import project.employee.model.Employee;
import project.employee.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee createEmployee(CreateEmployeeDTO createEmployeeDTO) {
        Employee employee = Employee.builder()
                .firstName(createEmployeeDTO.getFirstName())
                .lastName(createEmployeeDTO.getLastName())
                .department(createEmployeeDTO.getDepartment())
                .email(createEmployeeDTO.getEmail())
                .salary(createEmployeeDTO.getSalary())
                .build();

        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(UUID id) {
        return employeeRepository.findById(id);
    }

    public Optional<Employee> updateEmployee(UUID id, Employee employee) {
        if (employeeRepository.existsById(id)) {
            return Optional.of(employeeRepository.save(employee));
        }

        return Optional.empty();
    }

    public boolean deleteEmployee(UUID id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);

            return true;
        }

        return false;
    }
}
