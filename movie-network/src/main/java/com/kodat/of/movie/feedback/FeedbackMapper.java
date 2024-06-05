package com.kodat.of.movie.feedback;

import com.kodat.of.movie.movie.Movie;

import java.util.Objects;

public class FeedbackMapper {

    public Feedback toFeedback(FeedbackRequest request){
        return Feedback.builder()
                .note(request.note())
                .comment(request.comment())
                .movie(Movie.builder()
                        .id(request.movieId())
                        .archived(false) // Not required and has no impact
                        .shareable(false)// Not required and has no impact
                        .build()
                )
                .build();
    }

    public FeedbackResponse toFeedbackResponse(Feedback feedback, Integer id) {
        return FeedbackResponse.builder()
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(),id))
                .build();
    }
}
