package project.auth.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDTO {
    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @Past()
    private LocalDate dateOfBirth;
}