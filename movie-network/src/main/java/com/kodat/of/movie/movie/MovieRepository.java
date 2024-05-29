package com.kodat.of.movie.movie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Query("""
            SELECT movie
            FROM Movie movie
            WHERE movie.archived = false
            AND movie.shareable = true
            AND movie.owner.id != :userId
            """)
    Page<Movie> findAllDisplayableBooks(Pageable pageable, Integer userId);
}
