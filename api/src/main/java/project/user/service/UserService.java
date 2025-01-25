package project.user.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.user.dto.UpdateUserDTO;
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

    public List<User> getAll() {
        return this.userRepository.findAll();
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User updateUser(UUID id, UpdateUserDTO updateUserDTO) {
        User existingUser = getUserById(id);

        if ((existingUser.getUserName() != updateUserDTO.getUserName())
                && userRepository.existsByUsername(updateUserDTO.getUserName())) {
            throw new UsernameAlreadyExistsException(updateUserDTO.getUserName());
        } else {
            existingUser.setUserName(updateUserDTO.getUserName());
        }

        if (updateUserDTO.getSex() != null) {
            existingUser.setSex(updateUserDTO.getSex());
        }

        return userRepository.save(existingUser);
    }

    public boolean deleteUser(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }

        userRepository.deleteById(id);

        return true;
    }
}
