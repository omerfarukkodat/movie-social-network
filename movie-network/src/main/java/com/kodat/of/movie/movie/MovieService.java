package com.kodat.of.movie.movie;

import com.kodat.of.movie.common.PageResponse;
import com.kodat.of.movie.exception.OperationNotPermittedException;
import com.kodat.of.movie.file.FileStorageService;
import com.kodat.of.movie.history.MovieTransactionHistory;
import com.kodat.of.movie.history.MovieTransactionHistoryRepository;
import com.kodat.of.movie.user.entity.CustomUserDetails;
import com.kodat.of.movie.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
public class MovieService {

    private final MovieMapper movieMapper;
    private final MovieRepository movieRepository;
    private final MovieTransactionHistoryRepository movieTransactionHistoryRepository;
    private final FileStorageService fileStorageService;

    public MovieService(MovieMapper movieMapper, MovieRepository movieRepository, MovieTransactionHistoryRepository movieTransactionHistoryRepository, FileStorageService fileStorageService) {
        this.movieMapper = movieMapper;
        this.movieRepository = movieRepository;
        this.movieTransactionHistoryRepository = movieTransactionHistoryRepository;
        this.fileStorageService = fileStorageService;
    }


    public Integer save(MovieRequest request, Authentication connectedUser) {

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Movie movie = movieMapper.toMovie(request);
        movie.setOwner(user);

        return movieRepository.save(movie).getId();


    }


    public MovieResponse findById(Integer movieId) {
        return movieRepository.findById(movieId)
                .map(movieMapper::toMovieResponse)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with the movie id: " + movieId));
    }

    public PageResponse<MovieResponse> findAllMovies(int page, int size, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Movie> movies = movieRepository.findAllDisplayableMovies(pageable, user.getId());
        List<MovieResponse> movieResponse = movies.stream()
                .map(movieMapper::toMovieResponse)
                .toList();
        return new PageResponse<>(
                movieResponse,
                movies.getNumber(),
                movies.getSize(),
                movies.getTotalElements(),
                movies.getTotalPages(),
                movies.isFirst(),
                movies.isLast()
                );

    }

    public PageResponse<MovieResponse> findAllMoviesByOwner(int page, int size, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Movie> movies = movieRepository.findAll(MovieSpecification.withOwnerId(user.getId()) , pageable);

        List<MovieResponse> movieResponse = movies.stream()
                .map(movieMapper::toMovieResponse)
                .toList();

        return new PageResponse<>(
                movieResponse,
                movies.getNumber(),
                movies.getSize(),
                movies.getTotalElements(),
                movies.getTotalPages(),
                movies.isFirst(),
                movies.isLast()
        );
    }

    public PageResponse<BorrowedMovieResponse> findAllBorrowedMovies(int page, int size, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<MovieTransactionHistory> allBorrowedMovies = movieTransactionHistoryRepository.findAllBorrowedMovies(pageable,user.getId());
        List<BorrowedMovieResponse> movieResponses = allBorrowedMovies.stream()
                .map(movieMapper::toBorrowedMovieResponse)
                .toList();

        return new PageResponse<>(
                movieResponses,
                allBorrowedMovies.getNumber(),
                allBorrowedMovies.getSize(),
                allBorrowedMovies.getTotalElements(),
                allBorrowedMovies.getTotalPages(),
                allBorrowedMovies.isFirst(),
                allBorrowedMovies.isLast()
        );
    }

    public PageResponse<BorrowedMovieResponse> findAllReturnedMovies(int page, int size, Authentication connectedUser) {
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<MovieTransactionHistory> allBorrowedMovies = movieTransactionHistoryRepository.findAllReturnedMovies(pageable,user.getId());
        List<BorrowedMovieResponse> movieResponses = allBorrowedMovies.stream()
                .map(movieMapper::toBorrowedMovieResponse)
                .toList();

        return new PageResponse<>(
                movieResponses,
                allBorrowedMovies.getNumber(),
                allBorrowedMovies.getSize(),
                allBorrowedMovies.getTotalElements(),
                allBorrowedMovies.getTotalPages(),
                allBorrowedMovies.isFirst(),
                allBorrowedMovies.isLast()
        );
    }

    public Integer updateShareableStatus(Integer movieId, Authentication connectedUser) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + movieId));
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        if (!Objects.equals(movie.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update movies shareable status");
        }
        movie.setShareable(!movie.isShareable());
        movieRepository.save(movie);
        return movieId;



    }

    public Integer updateArchivedStatus(Integer movieId, Authentication connectedUser) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + movieId));
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        if (!Objects.equals(movie.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update movies archived status");
        }
        movie.setArchived(!movie.isArchived());
        movieRepository.save(movie);
        return movieId;


    }

    public Integer borrowMovie(Integer movieId, Authentication connectedUser) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + movieId));

        if (movie.isArchived() || !movie.isShareable()){
            throw new OperationNotPermittedException("You cannot borrow movie because  movie is not shareable");
        }

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        if (Objects.equals(movie.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot borrow your own movie ");
        }
        final boolean isAlreadyBorrowed = movieTransactionHistoryRepository.isAlreadyBorrowedByUser(movieId,user.getId());
        if (isAlreadyBorrowed) {
            throw new OperationNotPermittedException("This movie is already borrowed ");
        }
        MovieTransactionHistory movieTransactionHistory = MovieTransactionHistory.builder()
                .user(user)
                .movie(movie)
                .returned(false)
                .returnApproved(false)
                .build();
        return movieTransactionHistoryRepository.save(movieTransactionHistory).getId();
    }

    public Integer returnBorrowedMovie(Integer movieId, Authentication connectedUser) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + movieId));
        if (movie.isArchived() || !movie.isShareable()){
            throw new OperationNotPermittedException("You cannot borrow movie because  movie is not shareable");
        }

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        if (Objects.equals(movie.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot borrow or return your own movie ");
        }
        MovieTransactionHistory movieTransactionHistory = movieTransactionHistoryRepository.findByMovieIdAndUserId(movieId , user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("You did not borrowed this movie "));
        movieTransactionHistory.setReturned(true);
        return movieTransactionHistoryRepository.save(movieTransactionHistory).getId();
    }

    public Integer approveReturnBorrowedMovie(Integer movieId, Authentication connectedUser) {

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + movieId));
        if (movie.isArchived() || !movie.isShareable()){
            throw new OperationNotPermittedException("You cannot borrow movie because  movie is not shareable");
        }

        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();

        if (!Objects.equals(movie.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot borrow or return your own movie ");
        }
        MovieTransactionHistory movieTransactionHistory = movieTransactionHistoryRepository.findByMovieIdAndOwnerId(movieId , user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("The movie is not returned yet.You cannot approve its return "));
        movieTransactionHistory.setReturnApproved(true);
        return movieTransactionHistoryRepository.save(movieTransactionHistory).getId();

    }

    public void uploadMovieCoverPicture(MultipartFile file, Authentication connectedUser, Integer movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + movieId));
        CustomUserDetails userDetails = (CustomUserDetails) connectedUser.getPrincipal();
        User user = userDetails.getUser();
        var movieCover = fileStorageService.saveFile(file,user.getId());
        movie.setMovieCover(movieCover);
        movieRepository.save(movie);


    }
}
