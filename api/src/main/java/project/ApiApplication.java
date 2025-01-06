package project;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import project.employee.Employee;

@SpringBootApplication
public class ApiApplication {
    private static final Logger logger = LoggerFactory.getLogger(ApiApplication.class);

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(ApiApplication.class, args);

        var welcomeMessage = new Employee();

        System.out.println(welcomeMessage.getWelcomeMessage());

        logger.info("Something changed!");
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
            logger.info("Hello from Spring Boot!");
        };
    }
}
