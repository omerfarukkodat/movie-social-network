package com.kodat.of.movie.auth;

import com.kodat.of.movie.email.EmailService;
import com.kodat.of.movie.email.EmailTemplateName;
import com.kodat.of.movie.security.JwtService;
import com.kodat.of.movie.user.UserRepository;
import com.kodat.of.movie.user.entity.CustomUserDetails;
import com.kodat.of.movie.user.entity.User;
import com.kodat.of.movie.user.role.RoleRepository;
import com.kodat.of.movie.user.token.Token;
import com.kodat.of.movie.user.token.TokenRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
@Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;


    public AuthenticationService(RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserRepository userRepository, TokenRepository tokenRepository, EmailService emailService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    public void register(RegistrationRequest request) throws MessagingException {

        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("User role not found"));

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();

        userRepository.save(user);
        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) throws MessagingException {

        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );


    }

    private String generateAndSaveActivationToken(User user) {
        // Generate a token

        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var claims = new HashMap<String,Object>();
        var customUserDetails = (CustomUserDetails) auth.getPrincipal();
        var user = customUserDetails.getUser();
        claims.put("fullName" , user.fullName());
        var jwtToken = jwtService.generateToken(claims,customUserDetails);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
   // @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired.A new token is generated and sended");
        }
        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);

    }
    @Transactional
    public void deleteUser(AuthenticationRequest request) {

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);


    }
}
