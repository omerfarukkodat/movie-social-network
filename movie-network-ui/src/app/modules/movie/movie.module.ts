import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import {MainComponent} from "./pages/main/main.component";
import { MenuComponent } from './components/menu/menu.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { ManageMovieComponent } from './pages/manage-movie/manage-movie.component';
import {FormsModule} from "@angular/forms";
import { BorrowedMoviesComponent } from './pages/borrowed-movies/borrowed-movies.component';


@NgModule({
    declarations: [
        MainComponent,
        MenuComponent,
        MovieListComponent,
        MovieCardComponent,
        RatingComponent,
        ManageMovieComponent,
        BorrowedMoviesComponent
    ],
    exports: [
        MovieCardComponent
    ],
    imports: [
        CommonModule,
        MovieRoutingModule,
        FormsModule
    ]
})
export class MovieModule { }
