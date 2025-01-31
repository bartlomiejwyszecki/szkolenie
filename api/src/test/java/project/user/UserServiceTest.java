package project.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import project.user.dto.UpdateUserDTO;
import project.user.exception.EmailAlreadyExistsException;
import project.user.exception.UserNotFoundException;
import project.user.exception.UsernameAlreadyExistsException;
import project.user.model.Sex;
import project.user.model.User;
import project.user.repository.UserRepository;
import project.user.service.UserService;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UUID userId;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        userId = UUID.randomUUID();
        user = new User();
        user.setId(userId);
        user.setUsername("john_doe");
        user.setSex(Sex.MALE);
        user.setEmail("test@test.com");
        user.setPassword("testPASSWORD");
    }

    @Test
    void create_WhenUsernameAndEmailIsUnique_ShouldReturnSavedUser() {
        when(userRepository.existsByEmail("test@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("john_doe")).thenReturn(false);
        when(userRepository.save(user)).thenReturn(user);

        User createdUser = userService.create(user);

        assertNotNull(createdUser);
        assertNotNull(createdUser.getId());
        assertNotNull(createdUser.getPassword());
        assertEquals("john_doe", createdUser.getUsername());
        assertEquals("test@test.com", createdUser.getEmail());

        verify(userRepository, times(1)).existsByEmail("test@test.com");
        verify(userRepository, times(1)).existsByUsername("john_doe");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void create_WhenUsernameExists_ShouldThrowException() {
        when(userRepository.existsByUsername("john_doe")).thenReturn(true);
        
        assertThrows(UsernameAlreadyExistsException.class, () -> userService.create(user));

        verify(userRepository, times(1)).existsByUsername("john_doe");
        verify(userRepository, never()).save(user);
    }

    
    @Test
    void create_WhenEmailExists_ShouldThrowException() {
        when(userRepository.existsByEmail("test@test.com")).thenReturn(true);
        
        assertThrows(EmailAlreadyExistsException.class, () -> userService.create(user));

        verify(userRepository, times(1)).existsByEmail("test@test.com");
        verify(userRepository, never()).save(user);
    }

    @Test
    void getAll_ShouldReturnUserList() {
        when(userRepository.findAll()).thenReturn(List.of(user));

        List<User> users = userService.getAll();

        assertEquals(1, users.size());
        assertEquals("john_doe", users.get(0).getUsername());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getById_WhenUserExists_ShouldReturnUser() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        User foundUser = userService.getById(userId);

        assertNotNull(foundUser);
        assertEquals("john_doe", foundUser.getUsername());
        assertEquals(userId, foundUser.getId());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void getUserById_WhenUserNotFound_ShouldThrowException() {
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getById(userId));
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void updateUser_WhenUsernameAlreadyExists_ShouldThrowException() {
        UpdateUserDTO updateUserDTO = new UpdateUserDTO();
        updateUserDTO.setUsername("new_user");
        updateUserDTO.setSex(Sex.FEMALE);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("new_user")).thenReturn(true);

        assertThrows(UsernameAlreadyExistsException.class, () -> userService.update(userId, updateUserDTO));

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).existsByUsername("new_user");
    }

    @Test
    void updateUser_ShouldUpdateUserSuccessfully() {
        UpdateUserDTO updateUserDTO = new UpdateUserDTO();
        updateUserDTO.setUsername("new_user");
        updateUserDTO.setSex(Sex.FEMALE);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("new_user")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);

        User updatedUser = userService.update(userId, updateUserDTO);

        assertEquals("new_user", updatedUser.getUsername());
        assertEquals(Sex.FEMALE, updatedUser.getSex());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void deleteUser_WhenUserExists_ShouldDeleteUserSuccessfully() {
        when(userRepository.existsById(userId)).thenReturn(true);

        boolean result = userService.delete(userId);

        assertTrue(result);
        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void deleteUser_WhenUserDoesNotExist_ShouldThrowException() {
        when(userRepository.existsById(userId)).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> userService.delete(userId));

        verify(userRepository, times(1)).existsById(userId);
        verify(userRepository, never()).deleteById(any());
    }
}
