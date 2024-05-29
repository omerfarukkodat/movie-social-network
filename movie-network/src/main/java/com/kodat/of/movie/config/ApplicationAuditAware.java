package com.kodat.of.movie.config;

import com.kodat.of.movie.user.entity.CustomUserDetails;
import com.kodat.of.movie.user.entity.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class ApplicationAuditAware implements AuditorAware<Integer> {

    @Override
    public Optional<Integer> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || (authentication instanceof AnonymousAuthenticationToken)) {
            return Optional.empty();
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User userPrincipal = userDetails.getUser();

        return Optional.ofNullable(userPrincipal.getId());
    }
}
