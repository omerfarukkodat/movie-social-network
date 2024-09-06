import {Component, OnInit} from '@angular/core';
import {BorrowedMovieResponse} from "../../../../services/models/borrowed-movie-response";
import {PageResponseBorrowedMovieResponse} from "../../../../services/models/page-response-borrowed-movie-response";
import {MovieResponse} from "../../../../services/models/movie-response";
import {MovieService} from "../../../../services/services/movie.service";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-movies',
  templateUrl: './borrowed-movies.component.html',
  styleUrls: ['./borrowed-movies.component.scss']
})
export class BorrowedMoviesComponent implements OnInit{
  feedbackRequest: FeedbackRequest = {comment: '', movieId: 0 ,note: 0};
  page:number = 0;
  size:number = 5;
  borrowedMovies: PageResponseBorrowedMovieResponse = {};
  selectedMovie: BorrowedMovieResponse | undefined = undefined;


  constructor(
    private movieService: MovieService,
    private feedbackService: FeedbackService,
  ) {
  }


  ngOnInit(): void {
    this.findAllBorrowedMovies();
  }

  returnBorrowedMovie(movie: BorrowedMovieResponse) {
    this.selectedMovie = movie;
    this.feedbackRequest.movieId = movie.id as number;


  }

  private findAllBorrowedMovies() {
    this.movieService.findAllBorrowedMovies({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp: PageResponseBorrowedMovieResponse) => {
        this.borrowedMovies = resp;
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedMovies();

  }

  goToPreviousPage() {
    this.page --;
    this.findAllBorrowedMovies();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedMovies();
  }

  goToLastPage() {
    this.page = this.borrowedMovies.totalPages as number -1;
    this.findAllBorrowedMovies();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedMovies();
  }

  get isLastPAge(): boolean {
    return this.page == this.borrowedMovies.totalPages as number -1;
  }


  returnMovie(withFeedback: boolean) {
  this.movieService.returnBorrowedMovie({
    'movie-id': this.selectedMovie?.id as number
  }).subscribe({
    next: (): void => {
      if (withFeedback) {
        this.giveFeedback();
      }
      this.selectedMovie = undefined;
      this.findAllBorrowedMovies();
    }
  })
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe(
      {
        next: () => {

        }
      }
    )
  }
}
