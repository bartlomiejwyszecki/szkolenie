package project.user.dto;

import java.time.LocalDate;

import lombok.Data;
import project.user.model.Role;
import project.user.model.Sex;

@Data
public class UpdateUserDTO {
    private String userName;
    private String name;
    private String surname;
    private Role role;
    private LocalDate dateOfBirth;
    private Sex sex;
}
