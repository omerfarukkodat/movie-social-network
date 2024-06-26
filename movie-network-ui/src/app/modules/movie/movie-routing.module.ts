import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {MovieListComponent} from "./pages/movie-list/movie-list.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: MovieListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
