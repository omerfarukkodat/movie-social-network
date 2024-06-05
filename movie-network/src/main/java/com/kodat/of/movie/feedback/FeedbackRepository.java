package com.kodat.of.movie.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Query("""
            select feedback 
            FROM Feedback feedback
            where feedback.movie.id = :movieId
            """)
    Page<Feedback> findAllByMovieId(Integer movieId, Pageable pageable);
}
