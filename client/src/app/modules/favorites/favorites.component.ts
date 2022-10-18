import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) { }
  get favorites() { return this.favoritesService.favorites }
  verFavorites(){
    console.log(this.favoritesService.favorites)
  }
  ngOnInit(): void {
  }

}
