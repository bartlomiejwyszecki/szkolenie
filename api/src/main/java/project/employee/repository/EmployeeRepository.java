package project.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.employee.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {}
