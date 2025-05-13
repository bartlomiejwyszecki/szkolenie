package project.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.auth.model.VerificationToken;
import project.auth.repository.VerificationTokenRepository;

@Service
public class VerificationTokenService {
    private final VerificationTokenRepository tokenRepository;

    public VerificationTokenService(VerificationTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
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
    }
}
