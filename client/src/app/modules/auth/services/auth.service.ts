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

  get userDb(){
    return this._userDb
  }
}
  