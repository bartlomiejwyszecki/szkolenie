package project.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(UUID id) {
        return employeeRepository.findById(id);
    }

    // Update an existing employee
    public Optional<Employee> updateEmployee(UUID id, Employee employee) {
        if (employeeRepository.existsById(id)) {
            return Optional.of(employeeRepository.save(employee));
        }

        return Optional.empty();
    }

    // Delete employee by id
    public boolean deleteEmployee(UUID id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);

            return true;
        }

        return false;
    }
}
