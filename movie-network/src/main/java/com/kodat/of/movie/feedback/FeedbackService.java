package com.kodat.of.movie.feedback;

import com.kodat.of.movie.common.PageResponse;
import com.kodat.of.movie.exception.OperationNotPermittedException;
import com.kodat.of.movie.movie.Movie;
import com.kodat.of.movie.movie.MovieRepository;
import com.kodat.of.movie.user.entity.CustomUserDetails;
import com.kodat.of.movie.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FeedbackService {

    private final MovieRepository movieRepository;
    private final FeedbackRepository repository;
    private final FeedbackMapper feedbackMapper;

    public FeedbackService(MovieRepository movieRepository, FeedbackRepository repository, FeedbackMapper feedbackMapper) {
        this.movieRepository = movieRepository;
        this.repository = repository;
        this.feedbackMapper = feedbackMapper;
    }


    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        Movie movie = movieRepository.findById(request.movieId())
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + request.movieId()));
        if (movie.isArchived() || !movie.isShareable()) {
            throw new OptimisticLockingFailureException("You cannot give a feedback if you are archived or not shareable movie");
        }
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        if (Objects.equals(movie.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give a feedback to the owner of the movie");
        }
        Feedback feedback = feedbackMapper.toFeedback(request);
        return repository.save(feedback).getId();

    }

    public PageResponse<FeedbackResponse> findAllFeedBacksByMovie(
            Integer movieId,
            int page,
            int size,
            Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Page<Feedback> feedbacks = repository.findAllByMovieId(movieId,pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(f-> feedbackMapper.toFeedbackResponse(f,user.getId()))
                .toList();
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );

    }
}
