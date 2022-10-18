import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    children: [
      {
        path: "movies",
        loadChildren: () => import('../movies/movies.module').then(m => m.MoviesModule)
      },
      {
        path: "movie/:id",
        loadChildren: () => import('../movie-detail/movie-detail.module').then(m => m.MovieDetailModule)
      },
      {
        path: "series",
        loadChildren: () => import('../series/series.module').then(m => m.SeriesModule)
      },
      {
        path: "favorites",
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesModule)
      },
      {
        path: "dashboard",
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: "history",
        loadChildren: () => import('../history/history.module').then(m => m.HistoryModule)
      },
      {
        path: "admin",
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: "**", redirectTo: "movies", pathMatch: "full"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
