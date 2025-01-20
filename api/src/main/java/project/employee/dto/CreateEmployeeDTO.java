package project.employee.dto;

import lombok.Data;

@Data
public class CreateEmployeeDTO {
    private String firstName;
    private String lastName;
    private String department;
    private String email;
    private Double salary;

    public CreateEmployeeDTO(String firstName, String lastName, String email, String department, Double salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.salary = salary;
    }
}
