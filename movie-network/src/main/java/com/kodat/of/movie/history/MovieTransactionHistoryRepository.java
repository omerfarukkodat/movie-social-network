package com.kodat.of.movie.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MovieTransactionHistoryRepository extends JpaRepository<MovieTransactionHistory, Integer> {


    @Query("""
            SELECT history
            FROM MovieTransactionHistory history
            WHERE history.user.id = :userId
            """
    )
    Page<MovieTransactionHistory> findAllBorrowedMovies(Pageable pageable, Integer userId);

    @Query("""
            SELECT history
            FROM MovieTransactionHistory history
            WHERE history.movie.owner.id = :userId
            """
    )
    Page<MovieTransactionHistory> findAllReturnedMovies(Pageable pageable, Integer userId);

    @Query("""
            SELECT 
            (COUNT (*) > 0) AS isBorrowed
            FROM MovieTransactionHistory movieTransactionHistory
            WHERE movieTransactionHistory.user.id = :userId
            AND movieTransactionHistory.movie.id = :movieId
            AND movieTransactionHistory.returnApproved = false 
            """)
    boolean isAlreadyBorrowedByUser(Integer movieId, Integer userId);

    @Query("""
            select transaction
            FROM MovieTransactionHistory transaction
            WHERE transaction.user.id = :userId
            AND transaction.movie.id = :movieId
            AND transaction.returned = false
            AND transaction.returnApproved = false
            """)
    Optional<MovieTransactionHistory> findByMovieIdAndUserId(Integer movieId, Integer userId);



    @Query("""
            select transaction
            FROM MovieTransactionHistory transaction
            WHERE transaction.movie.owner.id = :userId
            AND transaction.movie.id = :movieId
            AND transaction.returned = true
            AND transaction.returnApproved = false
            """)
    Optional<MovieTransactionHistory> findByMovieIdAndOwnerId(Integer movieId, Integer userId);
}
