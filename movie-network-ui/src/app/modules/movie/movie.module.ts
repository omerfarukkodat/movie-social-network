import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import {MainComponent} from "./pages/main/main.component";
import { MenuComponent } from './components/menu/menu.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    MovieListComponent,
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
