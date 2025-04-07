package project.email.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import project.email.EmailService;
import project.email.dto.SendEmailDTO;
import project.employee.dto.CreateEmployeeDTO;
import project.employee.model.Employee;
import project.employee.service.EmployeeService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/email")
@Tag(name = "Auth")
public class EmailController {
    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody SendEmailDTO body) {
        try {
            emailService.sendEmail(body.getEmail(), body.getSubject(), body.getText());

            return ResponseEntity.ok("Email sent successfully.");
        } catch (MailException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send email: " + e.getMessage());
        }
    }
}
