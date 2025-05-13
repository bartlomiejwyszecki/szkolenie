package project.user.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email cannot be blank")
    @Email()
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Passwrod cannot be blank")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "user_name")
    private String username;

    @Column()
    private String name;

    @Column()
    private String surname;

    @Column(name = "date_of_birth", nullable = true)
    @Past()
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column()
    private Sex sex;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;
}