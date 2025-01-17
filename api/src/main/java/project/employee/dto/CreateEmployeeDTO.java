package project.employee.dto;

import lombok.Data;

@Data
public class CreateEmployeeDTO {
    private String firstName;
    private String lastName;
    private String department;
    private String email;
    private Double salary;
}
