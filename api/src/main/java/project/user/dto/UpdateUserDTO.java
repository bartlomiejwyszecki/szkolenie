package project.user.dto;

import lombok.Data;
import project.user.model.Sex;

@Data
public class UpdateUserDTO {
    private String username;
    private Sex sex;
}
