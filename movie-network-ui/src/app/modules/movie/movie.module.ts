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


@NgModule({
    declarations: [
        MainComponent,
        MenuComponent,
        MovieListComponent,
        MovieCardComponent,
        RatingComponent,
        ManageMovieComponent
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
