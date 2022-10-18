import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
export interface Actor {
  id: string,
  name: string,
  image: string,
  age?: string,
  history?: string,
  weight?: string
}
export interface Category {
  id: string,
  name: string,
  image?: string,
  color?: string
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _actors: Actor[]
  private _categories: Category[]
  private _actorsAvailables: Actor[]
  private _series = []

  getActorsByName(query: string) {
    return this.http.get(`http://localhost:3001/actor?name=${query}`)
      .pipe(tap((data: any) => { if (data.ok) { this._actorsAvailables = data.results } }))
  }
  postActor(newActor: Actor) {
    return this.http.post("http://localhost:3001/actor", newActor)
      .pipe(tap((data: any) => { if (data.ok) { this._actors.unshift(data.newActor) } }))
  }
  postCategory(newCategory: Category) {
    return this.http.post("http://localhost:3001/category", newCategory)
      .pipe(tap((data: any) => { if (data.ok) { this._categories.unshift(data.newCategory) } }))
  }
  isAvailableTitleMovie(title: string): Observable<boolean> {
    return this.http.get(`http://localhost:3001/movie?exactname=${title}`)
      .pipe(
        map((data: any) => !data.results.length)
      )
  }
  isAvailableTitleSerie(title: string): Observable<boolean> {
    return this.http.get(`http://localhost:3001/serie?exactname=${title}`)
      .pipe(
        tap(console.log),
        map((data: any) => !data.results.length)
      )
  }
  postMovie(movie: any) {
    return this.http.post('http://localhost:3001/movie', movie)
  }
  postSerie(serie: any) {
    return this.http.post('http://localhost:3001/serie', serie)
  }
  postChapter(body: any, seasonId: string) {
    return this.http.post(`http://localhost:3001/chapter/${seasonId}`, body)
  }
  postSeason(serieId: string, body: any) {
    return this.http.post(`http://localhost:3001/season/${serieId}`, body)
  }
  constructor(private http: HttpClient) {
    this.http.get("http://localhost:3001/actor")
      .subscribe((data: any) => { if (data.ok) { this._actors = data.results } })
    this.http.get("http://localhost:3001/category")
      .subscribe((data: any) => { if (data.ok) { this._categories = data.results } })
  }
  getSeriesByName(title: string) {
    return this.http.get(`http://localhost:3001/serie?name=${title}`)
      .pipe(tap((data: any) => { if (data.ok) { this._series = data.results } }))
  }
  getDataSere(id:string){
    return this.http.get(`http://localhost:3001/serie/${id}`)
  }

  get actors() { return this._actors }
  get categories() { return this._categories }
  get actorsAvailables() { return this._actorsAvailables }
  get series(){return this._series}
}
