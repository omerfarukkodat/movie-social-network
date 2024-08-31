import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {MovieListComponent} from "./pages/movie-list/movie-list.component";
import {MyMoviesComponent} from "./pages/my-movies/my-movies.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: MovieListComponent
      },
      {
        path: 'my-movies',
        component: MyMoviesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
