package project.email.dto;

import lombok.Data;

@Data
public class SendEmailDTO {
    private String email;
    private String password;
    private String subject;
}