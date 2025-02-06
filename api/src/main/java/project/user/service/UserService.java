package project.user.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.user.dto.UpdateUserDTO;
import project.user.exception.EmailAlreadyExistsException;
import project.user.exception.UserNotFoundException;
import project.user.exception.UsernameAlreadyExistsException;
import project.user.model.User;
import project.user.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User create(User user)
    {
        if (userRepository.existsByUsername(user.getUsername()) && user.getUsername() != null) {
            throw new UsernameAlreadyExistsException(user.getUsername());
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException(user.getEmail());
        }

        return userRepository.save(user);
    }

    public List<User> getAll() {
        return this.userRepository.findAll();
    }

    public User getById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User update(UUID id, UpdateUserDTO updateUserDTO) {
        User existingUser = getById(id);

        if ((existingUser.getUsername() != updateUserDTO.getUsername())
                && (userRepository.existsByUsername(updateUserDTO.getUsername()))) {
            throw new UsernameAlreadyExistsException(updateUserDTO.getUsername());
        } else {
            existingUser.setUsername(updateUserDTO.getUsername());
        }

        if (updateUserDTO.getSex() != null) {
            existingUser.setSex(updateUserDTO.getSex());
        }

        return userRepository.save(existingUser);
    }

    public boolean delete(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }

        userRepository.deleteById(id);

        return true;
    }
}
