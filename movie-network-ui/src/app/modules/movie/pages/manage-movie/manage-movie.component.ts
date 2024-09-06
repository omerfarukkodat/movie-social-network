import {Component, OnInit} from '@angular/core';
import {MovieRequest} from "../../../../services/models/movie-request";
import {MovieService} from "../../../../services/services/movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieResponse} from "../../../../services/models/movie-response";

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.component.html',
  styleUrls: ['./manage-movie.component.scss']
})
export class ManageMovieComponent implements OnInit{

  movieRequest: MovieRequest = {directorName: '' , synopsis: '' , title: ''}
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedMovieCover: any;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  onFileSelected(event: any) {
    this.selectedMovieCover = event.target.files[0];
    console.log(this.selectedMovieCover);
    if (this.selectedMovieCover) {
      const reader = new FileReader();
      reader.onload = (): void => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedMovieCover);
    }
  }

  saveMovie() {
    this.movieService.saveMovie({
      body: this.movieRequest
    }).subscribe({
      next: (movieId) =>{
        this.movieService.uploadMovieCoverPicture({
          'movie-id': movieId,
          body: {
            file: this.selectedMovieCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/movies/my-movies']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validation
      }
    });
  }

  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['movieId'];
    if (movieId){
      this.movieService.findMovieById(
        {
          'movie-id': movieId
        }
      ).subscribe({
        next: (movie: MovieResponse): void => {
          this.movieRequest = {
            id: movie.id,
            title: movie.title as string,
            directorName: movie.directorName as string,
            synopsis: movie.synopsis as string,
            shareable: movie.shareable
          }
          if (movie.movieCover){
            this.selectedPicture = 'data:image/jpeg;base64,' + movie.movieCover;
          }
        }
      });
    }
  }
}
