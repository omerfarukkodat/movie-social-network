import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedMovieResponse} from "../../../../services/models/page-response-borrowed-movie-response";
import {MovieService} from "../../../../services/services/movie.service";
import {BorrowedMovieResponse} from "../../../../services/models/borrowed-movie-response";

@Component({
  selector: 'app-returned-movies',
  templateUrl: './returned-movies.component.html',
  styleUrls: ['./returned-movies.component.scss']
})
export class ReturnedMoviesComponent implements OnInit{

  page:number = 0;
  size:number = 5;
  returnedMovies: PageResponseBorrowedMovieResponse = {};
  message: string = '';
  level: string = 'success';


  constructor(
    private movieService: MovieService,
  ) {
  }


  ngOnInit(): void {
    this.findAllReturnedMovies();
  }



  private findAllReturnedMovies() {
    this.movieService.findAllReturnedMovies({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp: PageResponseBorrowedMovieResponse) => {
        this.returnedMovies = resp;
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedMovies();

  }

  goToPreviousPage() {
    this.page --;
    this.findAllReturnedMovies();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedMovies();
  }

  goToLastPage() {
    this.page = this.returnedMovies.totalPages as number -1;
    this.findAllReturnedMovies();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedMovies();
  }

  get isLastPAge(): boolean {
    return this.page == this.returnedMovies.totalPages as number -1;
  }


  approveMovieReturn(movie: BorrowedMovieResponse) {
    if (!movie.returned){
      this.level = 'error';
      this.message = 'Movie is not returned';
      return;
    }
    this.movieService.approveReturnBorrowedMovie({
      'movie-id': movie.id as number
    }).subscribe({
      next: (): void => {
        this.level = 'success';
        this.message = 'Movie return approved';
        this.findAllReturnedMovies()
      }
    })
  }
}
