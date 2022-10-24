import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { FavoritesService } from '../favorites/services/favorites.service';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(
    private moviesService: MoviesService,
    private favoritesService: FavoritesService,
    private authService: AuthService) {

  }
  ngOnInit(): void { }
  get categories() {
    return this.moviesService.categories
  }

}
