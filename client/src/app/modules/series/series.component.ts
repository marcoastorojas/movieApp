import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { SeriesService } from './services/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  constructor(private seriesServices: SeriesService, private authServices: AuthService) { }
  get series() { return this.seriesServices.series }
  get favorites() { return this.authServices.userDb.favorites.series }
  ngOnInit(): void {
  }
  isFavorite(IdSerie: string) {
    return this.favorites.find((serie: any) => serie.id === IdSerie)
  }
  addFavorite(serie: any) {
    this.authServices.addFavoriteSerie(serie)
      .subscribe(console.log)
  }
  deleteFavorite(serieId:string){
    this.authServices.removeFavoriteSerie(serieId)
      .subscribe(console.log)
  }
}
