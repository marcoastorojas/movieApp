import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private moviesService: MoviesService
  ) {
    this.favoritesService.getFavorites(this.authService.userDb.id)
      .subscribe(console.log)
  }
  get movies() { return this.moviesService.movies }
  get favorites() { return this.favoritesService.favorites }
  ngOnInit(): void { }
  isFavorite(IdMovie: string) {
    return this.favorites.find((movie: any) => movie.id === IdMovie)
  }
  addFavorite(movie: any) {
    this.favoritesService.addFavorite(movie, this.authService.userDb.id)
      .subscribe((data: any) => { if (data.ok) { console.log("conexion created") } })
  }
  deleteFavorite(movieId: string) {
    this.favoritesService.removeFavorite(movieId, this.authService.userDb.id)
      .subscribe((data: any) => { if (data.ok) { console.log("conexion deleted") } })
  }
  verfavoritos() {
    console.log(this.favoritesService.favorites)
  }
}
