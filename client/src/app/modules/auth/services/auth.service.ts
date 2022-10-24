import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import AuthUser from '../interfaces/AuthUser';
import { ResponseAuth, UserDb } from '../interfaces/ResponseAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private _userDb: UserDb
  private baseUrl: string = "http://localhost:3001/auth"

  auth(url: string, user?: AuthUser) {
    const header = new HttpHeaders({
      token: localStorage.getItem("token") || ""
    })
    return this.http.post<ResponseAuth>(`${this.baseUrl}${url}`, user, { headers: header })
      .pipe(
        tap(res => {
          if (res.ok) {
            this._userDb = res.data
            localStorage.setItem("token", res.token)
          }
        }),
        map(res => res.ok),
        catchError(err => of(err))
      )
  }

  addFavorite(movie: any) {
    return this.http.post(`http://localhost:3001/user/${this._userDb.id}/addfavorite`, { movieId: movie.id })
      .pipe(tap((data: any) => {
        if (data.ok) { this._userDb.favorites.movies.push(movie) }
      }))
  }
  removeFavorite(movieId: string) {
    return this.http.post(`http://localhost:3001/user/${this._userDb.id}/deletefavorite`, { movieId })
      .pipe(tap((data: any) => {
        if (data.ok) {
          this._userDb.favorites.movies = this._userDb.favorites.movies
            .filter((movie: any) => movie.id !== movieId)
        }
      }))
  }
  addFavoriteSerie(serie: any) {
    return this.http.post(`http://localhost:3001/user/${this._userDb.id}/addfavoriteSerie`, { serieId: serie.id })
      .pipe(tap((data: any) => {
        if (data.ok) {
          this.userDb.favorites.series.push(serie)
        }
      }))
  }
  removeFavoriteSerie(serieId: string) {
    return this.http.post(`http://localhost:3001/user/${this._userDb.id}/deletefavoriteSerie`, { serieId })
      .pipe(tap((data: any) => {
        if (data.ok) {
          this.userDb.favorites.series = this.userDb.favorites.series
            .filter((serie: any) => serie.id !== serieId)
        }
      }))
  }

  get userDb() {
    return this._userDb
  }
}
