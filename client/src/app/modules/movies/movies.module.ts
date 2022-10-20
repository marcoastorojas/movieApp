import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { ByCategoryComponent } from './pages/by-category/by-category.component';
import { MoviesComponent } from './movies.component';


@NgModule({
  declarations: [
    MoviesPageComponent,
    ByCategoryComponent,
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
