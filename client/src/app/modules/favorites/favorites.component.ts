import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService: FavoritesService, private authService: AuthService) { }
  get favorites() { return this.authService.userDb.favorites.movies }
  get favoritesSeries() { return this.authService.userDb.favorites.series }
  verFavorites() {
    console.log(this.authService.userDb)
  }
  ngOnInit(): void {
  }

}
