package com.kodat.of.movie.user;

import com.kodat.of.movie.user.entity.CustomUserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<CustomUserDetails, Integer> {
    Optional<CustomUserDetails> findByUserEmail(String userEmail);

}
