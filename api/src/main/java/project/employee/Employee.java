package project.employee;

import org.springframework.stereotype.Component;

@Component
public class Employee {
    public String getWelcomeMessage() {
        return "Welcome to Employee";
    };
}
