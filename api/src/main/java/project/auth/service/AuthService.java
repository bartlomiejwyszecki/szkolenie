package project.auth.service;

import java.time.Instant;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import project.auth.config.JwtUtil;
import project.auth.dto.LoginDTO;
import project.auth.dto.RegisterDTO;
import project.auth.model.VerificationToken;
import project.user.model.Role;
import project.user.model.User;
import project.user.service.UserService;

@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserService userService,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterDTO registerDTO) {
        User user = User.builder()
            .email(registerDTO.getEmail())
            .password(passwordEncoder.encode(registerDTO.getPassword()))
            .role(Role.USER)
            .build();

        userService.create(user);

        String token = java.util.UUID.randomUUID().toString();

        VerificationToken verificationToken = VerificationToken.builder()
            .token(token)
            .user(user)
            .expiryDate(Instant.now().plusSeconds(60 * 60 * 24))
            .build();
    }

    public String login(LoginDTO login) {
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));

        return jwtUtil.generateToken(authentication.getName());
    }
}
