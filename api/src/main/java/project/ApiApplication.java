package project;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import project.config.AppConfig;

@SpringBootApplication
public class ApiApplication {
    private static final Logger logger = LoggerFactory.getLogger(ApiApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(AppConfig config) {
        return args -> {
            System.out.println("Application started with devmode set to " + config.isDevmode());
            logger.info("Hello from Spring Boot!");
        };
    }
}
