import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private _movies: any = []
  private _categories: any = []
  constructor(private http: HttpClient) {
    this.http.get("http://localhost:3001/movie/")
      .subscribe((data: any) => this._movies = data.results)
    this.http.get("http://localhost:3001/category/")
      .subscribe((data: any) => { this._categories = data.results })
  }
  getMoviesByCategory(categoryId: string) {
    return this.http.get(`http://localhost:3001/category/${categoryId}/movies`)
  }

  get categories() {
    return this._categories
  }
  get movies() {
    return this._movies
  }
}
