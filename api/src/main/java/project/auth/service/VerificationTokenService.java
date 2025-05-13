package project.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.auth.model.VerificationToken;
import project.auth.repository.VerificationTokenRepository;
import project.user.model.User;
import project.user.model.UserStatus;
import project.user.service.UserService;

@Service
public class VerificationTokenService {
    private final VerificationTokenRepository tokenRepository;
    private final UserService userService;

    public VerificationTokenService(VerificationTokenRepository tokenRepository, UserService userService) {
        this.tokenRepository = tokenRepository;
        this.userService = userService;
    }

    public void save(VerificationToken token) {
        tokenRepository.save(token);
    }

    public VerificationToken findByToken(String token) {
        return tokenRepository.findByToken(token).orElseThrow(() -> new IllegalArgumentException("Invalid token"));
    }

    @Transactional
    public void verifyToken(String token) {
        VerificationToken verificationToken = findByToken(token);

        if (verificationToken.getExpiryDate().isBefore(java.time.Instant.now())) {
            throw new IllegalStateException("Token expired");
        }

        User user = verificationToken.getUser();
        
        userService.updateUserStatus(user.getId(), UserStatus.ACTIVE);
    }
}
