package com.kodat.of.movie.feedback;

import com.kodat.of.movie.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;

@RestController
@RequestMapping("feedbacks")
@Tag(name = "Feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }


    @PostMapping
    public ResponseEntity<Integer> saveFeedback(
            @Valid @RequestBody FeedbackRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(feedbackService.save(request, connectedUser));
    }

    @GetMapping("/movie/{movie-id}")
    public ResponseEntity<PageResponse<FeedbackResponse>> findAllFeedbacksByMovie(
            @PathVariable("movie-id") Integer movieId,
            @RequestParam(name = "page", defaultValue = "0", required = false)
            int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser) {
        return ResponseEntity.ok(feedbackService.findAllFeedBacksByMovie(movieId,page,size,connectedUser);

    }

}
