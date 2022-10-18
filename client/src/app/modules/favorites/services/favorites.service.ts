import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: any
  constructor(private http: HttpClient) {
  }
  getFavorites(userId: string) {
    return this.http.get(`http://localhost:3001/user/${userId}/favorites`)
      .pipe(tap((data: any) => {
        this.favorites = data.results
      }))
  }
  addFavorite(movie: any, userId: string) {
    
    return this.http.post(`http://localhost:3001/user/${userId}/addfavorite`, { movieId: movie.id })
      .pipe(tap((data: any) => {
        if (data.ok) { this.favorites.push(movie) }
      }))
  }
  removeFavorite(movieId: string, userId: string) {
    return this.http.post(`http://localhost:3001/user/${userId}/deletefavorite`, { movieId })
      .pipe(tap((data: any) => {
        if (data.ok) {
          this.favorites = this.favorites.filter((movie: any) => { movie.id !== movieId })
        }
      }))
  }
}
