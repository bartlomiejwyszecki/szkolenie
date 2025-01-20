package project.employee;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import project.employee.dto.CreateEmployeeDTO;
import project.employee.model.Employee;
import project.employee.repository.EmployeeRepository;
import project.employee.service.EmployeeService;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee mockEmployee;
    private CreateEmployeeDTO mockCreateEmployeeDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        mockEmployee = Employee.builder()
                .id(UUID.randomUUID())
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .department("HR")
                .salary(50000.0)
                .build();

        mockCreateEmployeeDTO = new CreateEmployeeDTO("John", "Doe", "john.doe@example.com", "HR", 50000.0);
    }

    @Test
    void testCreateEmployee() {
        when(employeeRepository.save(any(Employee.class))).thenReturn(mockEmployee);

        Employee createdEmployee = employeeService.createEmployee(mockCreateEmployeeDTO);

        assertNotNull(createdEmployee);
        assertEquals("John", createdEmployee.getFirstName());
        assertEquals("Doe", createdEmployee.getLastName());
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    void testGetEmployeeById() {
        UUID id = mockEmployee.getId();
        when(employeeRepository.findById(id)).thenReturn(Optional.of(mockEmployee));

        Optional<Employee> foundEmployee = employeeService.getEmployeeById(id);

        assertTrue(foundEmployee.isPresent());
        assertEquals(mockEmployee.getId(), foundEmployee.get().getId());
        verify(employeeRepository, times(1)).findById(id);
    }

    @Test
    void testUpdateEmployeeWhenExists() {
        UUID id = mockEmployee.getId();
        when(employeeRepository.existsById(id)).thenReturn(true);
        when(employeeRepository.save(mockEmployee)).thenReturn(mockEmployee);

        Optional<Employee> updatedEmployee = employeeService.updateEmployee(id, mockEmployee);

        assertTrue(updatedEmployee.isPresent());
        verify(employeeRepository, times(1)).save(mockEmployee);
    }

    @Test
    void testUpdateEmployeeWhenNotExists() {
        UUID id = mockEmployee.getId();
        when(employeeRepository.existsById(id)).thenReturn(false);

        Optional<Employee> updatedEmployee = employeeService.updateEmployee(id, mockEmployee);

        assertTrue(updatedEmployee.isEmpty());
        verify(employeeRepository, never()).save(mockEmployee);
    }

    @Test
    void testDeleteEmployeeWhenExists() {
        UUID id = mockEmployee.getId();
        when(employeeRepository.existsById(id)).thenReturn(true);
        doNothing().when(employeeRepository).deleteById(id);

        boolean deleted = employeeService.deleteEmployee(id);

        assertTrue(deleted);
        verify(employeeRepository, times(1)).deleteById(id);
    }

    @Test
    void testDeleteEmployeeWhenNotExists() {
        UUID id = mockEmployee.getId();
        when(employeeRepository.existsById(id)).thenReturn(false);

        boolean deleted = employeeService.deleteEmployee(id);

        assertFalse(deleted);
        verify(employeeRepository, never()).deleteById(id);
    }
}