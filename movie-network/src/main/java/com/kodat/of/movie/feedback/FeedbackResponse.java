package com.kodat.of.movie.feedback;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class FeedbackResponse {
    private Double note;
    private String comment;
    private boolean ownFeedback;


}
