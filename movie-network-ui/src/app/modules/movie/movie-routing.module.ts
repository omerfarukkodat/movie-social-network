import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {MovieListComponent} from "./pages/movie-list/movie-list.component";
import {MyMoviesComponent} from "./pages/my-movies/my-movies.component";
import {ManageMovieComponent} from "./pages/manage-movie/manage-movie.component";
import {BorrowedMoviesComponent} from "./pages/borrowed-movies/borrowed-movies.component";
import {ReturnedMoviesComponent} from "./pages/returned-movies/returned-movies.component";
import {authGuard} from "../../services/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children:[
      {
        path: '',
        component: MovieListComponent,
        canActivate: [authGuard]

      },
      {
        path: 'my-movies',
        component: MyMoviesComponent,
        canActivate: [authGuard]

      },
      {
        path: 'manage',
        component: ManageMovieComponent,
        canActivate: [authGuard]

      },
      {
        path: 'manage/:movieId',
        component: ManageMovieComponent,
        canActivate: [authGuard]

      },
      {
        path: 'my-borrowed-movies',
        component: BorrowedMoviesComponent,
        canActivate: [authGuard]

      },
      {
        path: 'my-returned-movies',
        component: ReturnedMoviesComponent,
        canActivate: [authGuard]

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
