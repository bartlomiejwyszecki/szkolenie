package project.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import project.auth.model.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
}
