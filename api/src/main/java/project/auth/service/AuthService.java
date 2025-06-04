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
import project.email.EmailService;
import project.user.model.Role;
import project.user.model.User;
import project.user.model.UserStatus;
import project.user.service.UserService;

@Service
public class AuthService {
    private final UserService userService;
    private final VerificationTokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public AuthService(
            UserService userService,
            VerificationTokenService tokenService,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            EmailService emailService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    public void register(RegisterDTO registerDTO) {
        User user = User.builder()
            .email(registerDTO.getEmail())
            .password(passwordEncoder.encode(registerDTO.getPassword()))
            .role(Role.USER)
            .status(UserStatus.PENDING_VERIFICATION)
            .build();

        userService.create(user);

        String token = java.util.UUID.randomUUID().toString();

        VerificationToken verificationToken = VerificationToken.builder()
            .token(token)
            .user(user)
            .expiryDate(Instant.now().plusSeconds(60 * 60 * 24))
            .build();

        tokenService.save(verificationToken);

        String link = "fake-link.com/verify?token=" + token;

        emailService.sendConfirmationCode(user.getEmail(), link);
    }

    public String login(LoginDTO login) {
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));

        return jwtUtil.generateToken(authentication.getName());
    }
}
