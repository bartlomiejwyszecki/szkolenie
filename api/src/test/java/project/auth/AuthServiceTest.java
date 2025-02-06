package project.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import project.auth.config.JwtUtil;
import project.auth.dto.LoginDTO;
import project.auth.dto.RegisterDTO;
import project.auth.service.AuthService;
import project.user.exception.EmailAlreadyExistsException;
import project.user.model.Role;
import project.user.service.UserService;

public class AuthServiceTest {
    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void register_ValidData_CreatesUserWithEncodedPassword() {
        RegisterDTO registerDTO = new RegisterDTO();

        registerDTO.setEmail("test@test.com");
        registerDTO.setPassword("password123!TEST");

        when(passwordEncoder.encode("password123!TEST")).thenReturn("encodedPassword");

        authService.register(registerDTO);

        verify(userService).create(argThat(user -> user.getEmail().equals("test@test.com") &&
                user.getPassword().equals("encodedPassword") &&
                user.getRole() == Role.USER));
    }

    @Test
    void register_DuplicateEmail_ThrowsException() {
        RegisterDTO registerDTO = new RegisterDTO();

        registerDTO.setEmail("existing@email.com");
        registerDTO.setPassword("password123!TEST");

        when(userService.create(any())).thenThrow(new EmailAlreadyExistsException("existing@email.com"));

        assertThrows(EmailAlreadyExistsException.class, () -> authService.register(registerDTO));
    }

    @Test
    void login_ValidCredentials_ReturnsToken() {
        LoginDTO loginDTO = new LoginDTO();

        loginDTO.setEmail("test@test.com");
        loginDTO.setPassword("password123!TEST");

        Authentication mockAuth = mock(Authentication.class);

        when(authenticationManager.authenticate(any()))
                .thenReturn(mockAuth);
        when(mockAuth.getName()).thenReturn("test@test.com");
        when(jwtUtil.generateToken("test@test.com")).thenReturn("fakeToken");

        String token = authService.login(loginDTO);

        assertEquals("fakeToken", token);

        verify(authenticationManager).authenticate(
                new UsernamePasswordAuthenticationToken("test@test.com", "password123!TEST"));
    }

    @Test
    void login_InvalidCredentials_ThrowsException() {
        LoginDTO loginDTO = new LoginDTO();

        loginDTO.setEmail("test@test.com");
        loginDTO.setPassword("password123!TEST");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        assertThrows(BadCredentialsException.class, () -> authService.login(loginDTO));
    }
}
