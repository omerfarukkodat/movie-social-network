package com.kodat.of.movie.movie;

import com.kodat.of.movie.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("movies")
@Tag(name = "movie")
public class MovieController {

    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Integer> saveMovie(
            @Valid @RequestBody MovieRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));

    }

    @GetMapping("{movie-id}")
    public ResponseEntity<MovieResponse> findMovieById(
            @PathVariable("movie-id") Integer movieId
    ) {
        return ResponseEntity.ok(service.findById(movieId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<MovieResponse>> findAllMovies(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllMovies(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<MovieResponse>> findAllMoviesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllMoviesByOwner(page, size, connectedUser));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BorrowedMovieResponse>> findAllBorrowedMovies(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllBorrowedMovies(page, size, connectedUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<BorrowedMovieResponse>> findAllReturnedMovies(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllReturnedMovies(page, size, connectedUser));
    }

    @PatchMapping("/shareable/{movie-id}")
    public ResponseEntity<Integer> updateShareableStatus(
            @PathVariable("movie-id") Integer movieId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.updateShareableStatus(movieId, connectedUser));
    }

    @PatchMapping("/archived/{movie-id}")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("movie-id") Integer movieId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.updateArchivedStatus(movieId, connectedUser));
    }


    @PostMapping("/borrow/{movie-id}")
    public ResponseEntity<Integer> borrowMovie(
            @PathVariable("movie-id") Integer movieId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.borrowMovie(movieId,connectedUser));
    }

    @PatchMapping("/borrow/return/{movie-id}")
    public ResponseEntity<Integer> returnBorrowedMovie(
            @PathVariable("movie-id") Integer movieId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.returnBorrowedMovie(movieId,connectedUser));
    }

    @PatchMapping("/borrow/return/approve/{movie-id}")
    public ResponseEntity<Integer> approveReturnBorrowedMovie(
            @PathVariable("movie-id") Integer movieId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.approveReturnBorrowedMovie(movieId,connectedUser));
    }

    @PostMapping(value = "/cover/{movie-id}" , consumes = "multipart/form-data")
    public ResponseEntity<?> uploadMovieCoverPicture(
            @PathVariable("movie-id") Integer movieId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ){
        service.uploadMovieCoverPicture(file,connectedUser,movieId);
        return ResponseEntity.accepted().build();
    }



}
