import { Component } from '@angular/core';
import {MovieRequest} from "../../../../services/models/movie-request";
import {MovieService} from "../../../../services/services/movie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.component.html',
  styleUrls: ['./manage-movie.component.scss']
})
export class ManageMovieComponent {

  movieRequest: MovieRequest = {directorName: '' , synopsis: '' , title: ''}
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedMovieCover: any;

  constructor(
    private movieService: MovieService,
    private router: Router
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
            this.router.navigate(['movies/my-movies']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validation
      }
    });
  }
}
