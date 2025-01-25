package project.user.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String username) {
        super("Provided username: " + username + " is already taken.");
    }
}
