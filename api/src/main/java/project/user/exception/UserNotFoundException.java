package project.user.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(UUID id) {
        super("User with " + id + " does not exist");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
