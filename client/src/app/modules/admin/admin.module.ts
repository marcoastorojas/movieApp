import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MovieComponent } from './pages/movie/movie.component';
import { SerieComponent } from './pages/serie/serie.component';
import { UsersComponent } from './pages/users/users.component';
import { SuscriptionsComponent } from './pages/suscriptions/suscriptions.component';
import { ActorsComponent } from './pages/actors/actors.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewSerieComponent } from './pages/new-serie/new-serie.component';
import { NewEpisodeComponent } from './pages/new-episode/new-episode.component';
import { FormEpisodeComponent } from './components/form-episode/form-episode.component';


@NgModule({
  declarations: [
    AdminComponent,
    MovieComponent,
    SerieComponent,
    UsersComponent,
    SuscriptionsComponent,
    ActorsComponent,
    CategoriesComponent,
    NewSerieComponent,
    NewEpisodeComponent,
    FormEpisodeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
