import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { MoviesService } from '../../services/movies.service';

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

  }
  get movies() { return this.moviesService.movies }
  get favorites() { return this.authService.userDb.favorites.movies }
  ngOnInit(): void { }
  isFavorite(IdMovie: string) {
    return this.favorites.find((movie: any) => movie.id === IdMovie)
  }
  addFavorite(movie: any,e:any) {
    e.stopPropagation()
    this.authService.addFavorite(movie)
      .subscribe((data: any) => { if (data.ok) { console.log("conexion created") } })
  }
  deleteFavorite(movieId: string,e:any) {
    e.stopPropagation()
    this.authService.removeFavorite(movieId)
      .subscribe((data: any) => { if (data.ok) { console.log("conexion deleted") } })
  }

}
