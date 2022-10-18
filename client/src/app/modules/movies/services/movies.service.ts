import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private _movies: any = []
  constructor(private http: HttpClient) {
    this.http.get("http://localhost:3001/movie/")
      .subscribe((data: any) => this._movies = data.results)
  }
  get movies(){
    return this._movies
  }
}
