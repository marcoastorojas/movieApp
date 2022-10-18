import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ActorsComponent } from './pages/actors/actors.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MovieComponent } from './pages/movie/movie.component';
import { NewEpisodeComponent } from './pages/new-episode/new-episode.component';
import { NewSerieComponent } from './pages/new-serie/new-serie.component';
import { SerieComponent } from './pages/serie/serie.component';
import { SuscriptionsComponent } from './pages/suscriptions/suscriptions.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "serie", component: SerieComponent,
        children: [
          {
            path: "episode", component: NewEpisodeComponent
          },
          {
            path: "new", component: NewSerieComponent
          },
          {
            path: "**", redirectTo: "new", pathMatch: "full"
          }
        ]
      },
      { path: "suscription", component: SuscriptionsComponent },
      { path: "movie", component: MovieComponent },
      { path: "actors", component: ActorsComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "**", redirectTo: "movie", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
